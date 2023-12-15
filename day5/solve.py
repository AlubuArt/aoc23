def read_input(file_path):

    with open(file_path, 'r') as file:
        data = file.read()

    sections = data.split('\n\n')
    seeds = list(map(int, sections[0].split(': ')[1].split()))
    mappings = []

    for category in sections[1:]:
        lines = category.strip().split('\n')[1:] 
        mapping = [tuple(map(int, line.split())) for line in lines]
        mappings.append(mapping)

    return seeds, mappings

def map_number(number, mapping):
    for dest_start, src_start, length in mapping:
        if src_start <= number < src_start + length:
            return dest_start + (number - src_start)
    return number

def map_through_categories(number, mappings):
    for mapping in mappings:
        number = map_number(number, mapping)
    return number

def find_lowest_location(seeds, mappings):
    locations = [map_through_categories(seed, mappings) for seed in seeds]
    return min(locations)


file_path = 'day5/input.txt'  
seeds, mappings = read_input(file_path)

lowest_location = find_lowest_location(seeds, mappings)
print("P1 - The lowest location number is:", lowest_location)



# part two

def seeds_to_pairs(seeds):
    # Ensure the number of seeds is even for pairing
    if len(seeds) % 2 != 0:
        raise ValueError("The number of seeds should be even to form pairs.")

    # Form pairs from the seeds
    seed_pairs = [(seeds[i], seeds[i + 1]) for i in range(0, len(seeds), 2)]
    return seed_pairs

class Range:
    def __init__(self, start, end):
        self.start = start
        self.end = end

def transform_range(seed_range, mapping):
    new_ranges = []
    for m in mapping:
        # Check if the mapping rule applies to the current range
        if seed_range.start <= m[1] + m[2] and seed_range.end >= m[1]:
            mapped_start = max(seed_range.start, m[1])
            mapped_end = min(seed_range.end, m[1] + m[2] - 1)
            offset = m[0] - m[1]
            new_ranges.append(Range(mapped_start + offset, mapped_end + offset))
    return new_ranges if new_ranges else [seed_range]

def find_overall_lowest_location(seed_ranges, mappings):
    current_ranges = [Range(start, start + length - 1) for start, length in seed_ranges]
    
    for mapping in mappings:
        new_ranges = []
        for r in current_ranges:
            new_ranges.extend(transform_range(r, mapping))
        current_ranges = new_ranges
    
    return min(r.start for r in current_ranges)


seed_ranges = seeds_to_pairs(seeds)

# Find the lowest location number
lowest_location_2 = find_overall_lowest_location(seed_ranges, mappings)
print("P2 - The lowest location number is:", lowest_location_2)
