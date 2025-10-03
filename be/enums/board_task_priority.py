from enum import Enum

class BoardTaskPriorityType(int, Enum):
    LOW = 0
    MEDIUM = 1
    HIGH = 2
    URGENT = 3