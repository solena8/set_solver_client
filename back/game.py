from dataclasses import dataclass
import random
from typing import Optional

from card import Card
from selection import Selection
from set import Set

@dataclass
class Game:
    pile: list[Card]
    selection: Selection
    opt_set: Optional[Set]

    def __init__(self):
        self.pile = []
        self.selection = Selection()
        self.opt_set = None

        for number in ["1", "2", "3"]:
            for shape in ["L", "O", "V"]:
                for color in ["V", "M", "R"]:
                    for filling in ["H", "P", "V"]:
                        self.pile.append(Card(number=number, shape=shape, color=color, filling=filling))

    def len_pile(self) -> int:
        return len(self.pile)

    def move_cards_from_pile_to_selection(self, nb_cards: int):
        random_selection: list[Card] = random.sample(self.pile, nb_cards)
        for card in random_selection:
            self.selection.selection_cards.append(card)
            self.pile.remove(card)

    def init_selection(self):
        self.move_cards_from_pile_to_selection(12)

    def add_3_cards(self):
        if (self.len_pile() >= 3 and self.selection.len_selection() == 12 and not self.opt_set) or self.selection.len_selection() == 9:
            self.move_cards_from_pile_to_selection(3)

    def print_and_remove_from_selection(self):
        print(self.opt_set)
        self.selection.selection_cards.remove(self.opt_set.card1)
        self.selection.selection_cards.remove(self.opt_set.card2)
        self.selection.selection_cards.remove(self.opt_set.card3)

    def game_over(self) -> bool:
        return self.opt_set is None and (
                self.selection.len_selection() > 15 or self.len_pile() < 3)

    def game_play(self):
        self.init_selection()
        while not self.game_over():
            self.opt_set = self.selection.find_set()
            if self.opt_set:
                self.print_and_remove_from_selection()
            self.add_3_cards()
        print("No more matches found.")
        print("Remaining cards are:", self.selection.selection_cards, self.pile)
        print(len(self.selection.selection_cards), "+", len(self.pile), "cards left")
