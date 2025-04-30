def level_up(current_level, current_xp):
    xp_required = current_level * 100
    while current_xp >= xp_required:
        current_xp -= xp_required
        current_level += 1
        xp_required = current_level * 100
    return current_level, current_xp

def get_user_rank(level):
    if level < 5:
        return "E-Rank"
    elif level < 10:
        return "D-Rank"
    elif level < 20:
        return "C-Rank"
    elif level < 35:
        return "B-Rank"
    elif level < 50:
        return "A-Rank"
    elif level < 75:
        return "S-Rank"
    elif level < 100:
        return "SS-Rank"
    else:
        return "SSS-Rank"