from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait # available since 2.4.0
from selenium.webdriver.support import expected_conditions as EC # available since 2.26.0
from selenium.webdriver.common.by import By

class LoginPage:
	def __init__(self, driver):
		self._driver = driver
		self._driver.get("http://www.fitocracy.com")

	def OpenLoginModal(self):
		self._driver.find_element(By.CLASS_NAME, "login-button").click()