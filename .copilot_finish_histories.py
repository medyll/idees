import os
import re

root = r"D:\boulot\dev\node\idees"
ts_full = "2026-03-10 18:34"
trigger = "fais progresser toutes les idées d'un cran"

mapping = {
    "germination":"en croissance",
    "en croissance":"mature",
    "mature":"archivée",
    "en développement actif":"mature",
}

def prepend_history(history_path, old_status, new_status):
    with open(history_path, "r", encoding="utf-8") as f:
        txt = f.read()
    if ts_full in txt:
        return False
    if txt.lstrip().startswith("|"):
        lines = txt.splitlines()
        sep_idx = None
        for i, L in enumerate(lines):
            if re.match(r"^\|[-\s|:]+$", L.strip()):
                sep_idx = i
                break
        if sep_idx is None:
            new = "- %s : Statut avancé de %s → %s (mise à jour en masse, trigger: '%s')\n" % (ts_full, old_status, new_status, trigger) + txt
        else:
            new_row = "| %s | **Mise à jour : progression de statut** | Statut avancé de %s → %s suite à commande '%s'. |" % (ts_full, old_status, new_status, trigger)
            lines.insert(sep_idx+1, new_row)
            new = "\n".join(lines)
    else:
        lines = txt.splitlines()
        insert_at = 0
        if lines and lines[0].startswith("#"):
            if len(lines) > 1 and lines[1].strip() == "":
                insert_at = 2
            else:
                insert_at = 1
        new_bullet = "- %s : Statut avancé de %s → %s (mise à jour en masse, trigger: '%s')" % (ts_full, old_status, new_status, trigger)
        lines.insert(insert_at, new_bullet)
        new = "\n".join(lines)
    with open(history_path, "w", encoding="utf-8") as f:
        f.write(new)
    return True

changed = []
for d in os.listdir(root):
    full = os.path.join(root, d)
    if not os.path.isdir(full):
        continue
    idea_md = os.path.join(full, "idea.md")
    hist_md = os.path.join(full, "history.md")
    if not os.path.isfile(idea_md):
        continue
    try:
        with open(idea_md, "r", encoding="utf-8") as f:
            idea_txt = f.read()
    except Exception:
        continue
    m = re.search(r"^\*\*Statut ?:\*\*\s*(.+)$", idea_txt, flags=re.M)
    if not m:
        continue
    old_status = m.group(1).strip()
    new_status = mapping.get(old_status, old_status)
    if os.path.isfile(hist_md):
        updated = prepend_history(hist_md, old_status, new_status)
        if updated:
            changed.append(hist_md)
    else:
        title = os.path.basename(full)
        content = "# %s — History\n\n- %s : Statut avancé de %s → %s (mise à jour en masse, trigger: '%s')\n" % (title, ts_full, old_status, new_status, trigger)
        with open(hist_md, "w", encoding="utf-8") as f:
            f.write(content)
        changed.append(hist_md)

print('UPDATED_HISTORY_COUNT:', len(changed))
for c in changed:
    print(c)
