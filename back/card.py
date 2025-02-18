from dataclasses import dataclass


@dataclass
class Card:
    number: str
    shape: str
    color: str
    filling: str

    def __str__(self):
        return f"{self.number}{self.shape}{self.color}{self.filling}"

# @ToDo : faire des enums au lieu de str pour les attributs
