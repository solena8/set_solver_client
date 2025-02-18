from typing import List
from card import Card
from selection import Selection

# set_game_1 = Game()
# set_game_1.game_play()

def my_api(params: List[str]):

    selection_instance = Selection()
    for param in params:
        card: Card = Card(*param)
        selection_instance.selection_cards.append(card)
    selection_instance.find_set()