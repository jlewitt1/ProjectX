import numpy as np

from model import generate_data


class Location:
    def __init__(self, x0, y0):
        self.x0 = x0
        self.y0 = y0

    def find_hottest_point(self):
        location = [self.x0, self.y0]
        hot_point_data = generate_data.hottest_point(location)
        return hot_point_data

    def get_random_point(self, radius):
        a = self.x0
        b = self.y0
        r = radius

        x_min = a - r
        x_max = a + r
        x_range = x_max - x_min

        x1 = x_min + np.random.uniform(0, 1) * x_range

        y_delta = np.sqrt(np.power(r, 2) - np.power((x1 - a), 2))
        y_max = b + y_delta
        y_min = b - y_delta
        y_range = y_max - y_min

        y1 = y_min + np.random.uniform(0, 1) * y_range

        return x1, y1
