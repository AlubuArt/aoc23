

def sum_part_numbers(schematic):
    rows = len(schematic)
    cols = len(schematic[0])
    visited = [[False for _ in range(cols)] for _ in range(rows)]
    total_sum = 0

    for i in range(rows):
        for j in range(cols):
            if is_symbol(schematic[i][j]):
                total_sum += sum_adjacent_numbers(schematic, i, j, visited, rows, cols)

    return total_sum

def is_symbol(cell):
    return cell not in '.0123456789'

def sum_adjacent_numbers(schematic, x, y, visited, rows, cols):
    directions = [(0,1), (1,0), (0,-1), (-1,0), (1,1), (1,-1), (-1,1), (-1,-1)]
    sum = 0

    for dx, dy in directions:
        nx, ny = x + dx, y + dy
        if 0 <= nx < rows and 0 <= ny < cols and schematic[nx][ny].isdigit() and not visited[nx][ny]:
            number = find_complete_number(schematic, nx, ny, visited, cols)
            sum += int(number)

    return sum

def find_complete_number(schematic, x, y, visited, cols):
    number = ''

    # Move to the leftmost digit of the number
    while y > 0 and schematic[x][y-1].isdigit():
        y -= 1

    # Construct the number by moving right
    while y < cols and schematic[x][y].isdigit() and not visited[x][y]:
        number += schematic[x][y]
        visited[x][y] = True
        y += 1

    return number

def read_schematic_from_file(file_path):
    with open(file_path, 'r') as file:
        return [line.strip() for line in file]

# Example usage
file_path = 'input.txt'  # Replace with your file path
schematic = read_schematic_from_file(file_path)


print(sum_part_numbers(schematic))  # Expected output: 4361


def sum_gear_ratios(schematic):
    rows = len(schematic)
    cols = len(schematic[0])
    visited = [[False for _ in range(cols)] for _ in range(rows)]
    total_ratio_sum = 0

    for i in range(rows):
        for j in range(cols):
            if schematic[i][j] == '*':
                part_numbers = get_adjacent_part_numbers(schematic, i, j, visited, rows, cols)
                if len(part_numbers) == 2:
                    total_ratio_sum += part_numbers[0] * part_numbers[1]

    return total_ratio_sum

def get_adjacent_part_numbers(schematic, x, y, visited, rows, cols):
    directions = [(0,1), (1,0), (0,-1), (-1,0), (1,1), (1,-1), (-1,1), (-1,-1)]
    part_numbers = []

    for dx, dy in directions:
        nx, ny = x + dx, y + dy
        if 0 <= nx < rows and 0 <= ny < cols and schematic[nx][ny].isdigit() and not visited[nx][ny]:
            number = find_complete_number(schematic, nx, ny, visited, cols)
            part_numbers.append(int(number))
            if len(part_numbers) == 2:
                break

    return part_numbers

# Rest of the functions remain the same


print(sum_gear_ratios(schematic))  # Expected output: 467835
