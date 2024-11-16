from dataclasses import dataclass
from typing import Dict, List


@dataclass
class Features:
    age: int
    experience_level: str
    hackathons_done: int
    programming_skills: Dict[str, int]
    preferred_team_size: int
    preferred_languages: List[str]