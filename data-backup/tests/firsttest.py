import unittest

def add(x,y):
	return x+y

class fixture1(unittest.TestCase):

	def test_add(self):
		result = add(1,2)
		self.assertEqual(result, 3)

	def test_failingTest(self):
		result = add(1,2)
		self.assertEqual(result, 4, "msg")

if __name__ == '__main__':
	unittest.main()