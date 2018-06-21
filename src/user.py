from src.location import Location

import matplotlib.pyplot as plt
import numpy as np
from mpl_toolkits.axes_grid1 import host_subplot
from mpl_toolkits.axisartist import Axes


class User:
    def __init__(self, config):
        # self.start_loc = [40.7829, -73.9654]
        # self.end_loc = self.start_loc
        # self.distance = 10
        self.startLoc = config['startLocation']
        self.endLoc = self.startLoc
        self.distance = config['distance']

    def process_user_setting(self):
        location = Location(self.start_loc[0], self.start_loc[1])
        fig = plt.figure()
        ax = host_subplot(111, axes_class=Axes)

        ax.set_autoscale_on(True)

        latitude1, longitude1 = location.x0, location.y0  # type: (float, float)
        ax.plot(latitude1, longitude1, 'ro')

        location = Location(latitude1, longitude1)

        for i in range(1, 10):
            x, y, dist = location.find_hottest_point()
            print(x, y)
            ax.plot(x, y, 'bo')
        plt.show()
        return x, y


config = 0
user = User(config)
user.process_user_setting()
