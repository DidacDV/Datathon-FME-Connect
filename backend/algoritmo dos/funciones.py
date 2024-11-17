from typing import Dict, List, Set
from django.db.models import Q
import ast

def form_teams_for_nolock() -> None:
    """
    Forms teams only for participants in ParticipantNoLock table.
    These are participants who:
    - Don't want to work alone (preferred_team_size > 1)
    - Have some friend registrations but aren't a complete team yet
    """
    def calculate_compatibility_score(p1: Participant, p2: Participant) -> float:
        """Calculate compatibility between two participants"""
        score = 0.0
        
        # Compare programming skills
        p1_skills = parse_programming_skills(p1.programming_skills)
        p2_skills = parse_programming_skills(p2.programming_skills)
        
        skill_complement = 0
        for skill in p1_skills:
            if skill in p2_skills:
                skill_diff = abs(p1_skills[skill] - p2_skills[skill])
                if skill_diff <= 2:  # Similar skill levels
                    skill_complement += 0.1
                else:  # Complementary skill levels
                    skill_complement += 0.15
        score += skill_complement
        
        # Experience level compatibility
        if p1.experience_level == p2.experience_level:
            score += 0.2
            
        # Role diversity bonus
        if p1.preferred_role != p2.preferred_role:
            score += 0.3
            
        # Language compatibility
        if p1.preferred_language == p2.preferred_language:
            score += 0.2
            
        return score

    def get_friends_list(participant: Participant) -> Set[str]:
        """Get the set of friend IDs for a participant"""
        try:
            return set(ast.literal_eval(participant.friend_registration))
        except:
            return set()

    def create_team_with_friends():
        """Process participants and their friends into teams"""
        processed_ids = set()
        
        # Get all nolock participants
        nolock_participants = ParticipantNoLock.objects.all()
        
        for nolock in nolock_participants:
            participant = nolock.id
            
            # Skip if already processed
            if participant.id in processed_ids:
                continue
                
            # Get participant's friends
            friends = get_friends_list(participant)
            team_members = {participant.id}
            team_members.update(friends)
            
            # Calculate how many more team members needed
            spots_needed = participant.preferred_team_size - len(team_members)
            
            # Find compatible teammates if needed
            while spots_needed > 0:
                best_score = -1
                best_match = None
                
                for candidate_nolock in nolock_participants:
                    candidate = candidate_nolock.id
                    
                    # Skip if already in a team or is the same participant
                    if candidate.id in processed_ids or candidate.id == participant.id:
                        continue
                        
                    # Skip if candidate has friend registrations that would overflow the team
                    candidate_friends = get_friends_list(candidate)
                    if len(candidate_friends) >= spots_needed:
                        continue
                    
                    score = calculate_compatibility_score(participant, candidate)
                    
                    if score > best_score:
                        best_score = score
                        best_match = candidate
                
                if best_match:
                    # Add candidate and their friends
                    team_members.add(best_match.id)
                    best_match_friends = get_friends_list(best_match)
                    team_members.update(best_match_friends)
                    spots_needed = participant.preferred_team_size - len(team_members)
                else:
                    # No more suitable matches found
                    break
            
            # Create team if we have members
            if team_members:
                try:
                    addTeam(team_members)
                    # Mark all team members as processed
                    processed_ids.update(team_members)
                    # Remove processed participants from ParticipantNoLock
                    for member_id in team_members:
                        ParticipantNoLock.objects.filter(id__id=member_id).delete()
                except ValueError as e:
                    print(f"Could not create team: {e}")
                    break

def create_nolock_teams():
    """Main function to create teams for nolock participants"""
    try:
        form_teams_for_nolock()
    except Exception as e:
        print(f"Error in team formation: {e}")