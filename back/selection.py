from dataclasses import dataclass
from itertools import combinations
from typing import Optional

from card import Card
from set import Set


@dataclass
class Selection:
    selection_cards: list[Card]

    def __init__(self):
        self.selection_cards: list = []

    def len_selection(self) -> int:
        return len(self.selection_cards)

    def find_set(self) -> Optional[Set]:
        for card_1, card_2, card_3 in combinations(self.selection_cards, 3):
            search_set = Set(card1=card_1, card2=card_2, card3=card_3)
            if search_set.check_if_set_is_valid():
                return search_set
        return None
