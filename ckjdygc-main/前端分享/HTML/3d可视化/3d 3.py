from matplotlib import pyplot as plt

import numpy as np

from mpl_toolkits.mplot3d import Axes3D

figure = plt.figure()

ax = Axes3D(figure)

X = np.arange(-10, 10, 0.25)

Y = np.arange(-10, 10, 0.25)

#网格化数据

X, Y = np.meshgrid(X, Y)

R = np.sqrt(X**2 + Y**2)

Z = np.cos(R)

ax.plot_surface(X, Y, Z, rstride=1, cstride=1, cmap='rainbow')

plt.show()
