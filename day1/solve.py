'''
For each line in input
check each character
if character is a number, add it to an array.
when done, take the first and last number in the array and combine to a number, then add it to an array and sum it up.

'''

with open('day1/input.txt', 'r') as l:
  lines = l.readlines()

def create_new_number(arr):
    new_number_str = str(arr[0]) + str(arr[-1])
    new_number = int(new_number_str)
    return new_number

def p1():
  calibrationValues = 0
  for line in lines: 
    digits = []
    for char in line:
      if char.isdigit():
        digits.append(char)
    calibrationValues += create_new_number(digits)
  print(calibrationValues)

'''
for each line in text,
check for strings or numbers
take first string or number, 
if string, convert to number, and create new number from first and last number in each line
oneight LOL
'''
import re

def find_overlapping_words(string, words):
    matches = []
    for i in range(len(string)):
        for word in words:
            if string[i:].startswith(word):
                matches.append((word, i))
    return matches

# Mapping of words to their numeric values
word_to_digit = {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9}

def p2():
    total_sum = 0
    for line in lines:
        # Find all word digits with their indices
        word_matches = find_overlapping_words(line, word_to_digit.keys())

        # Find all numeric digits with their indices
        numeric_matches = [(m.group(), m.start()) for m in re.finditer(r'\d', line)]

        # Combine word and numeric digits, and sort them based on their indices
        all_matches = word_matches + numeric_matches
        all_matches.sort(key=lambda x: x[1])

        # Convert word digits to numbers and flatten the list
        digits = [word_to_digit[match[0]] if match[0] in word_to_digit else int(match[0]) for match in all_matches]

       # Sum the values for the current line
        line_sum = create_new_number(digits)
        total_sum += line_sum
    print(total_sum)

p2()














