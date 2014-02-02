from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait # available since 2.4.0
from selenium.webdriver.support import expected_conditions as EC # available since 2.26.0
from selenium.webdriver.common.by import By

#import page_objects #TODO - figure out python modules/imports etc., move page object classes into separate files
import getpass

# TODO: research 
# class BasePage:
# 	def WaitForAjax(self)

def WaitForAjax(driver):
	WebDriverWait(driver, 10).until(driver.execute_script("return jQuery.active == 0"))

class LoginPage:
	def __init__(self, driver):
		self._driver = driver
		self._driver.get("http://www.fitocracy.com")

	def OpenLoginModal(self):
		self._driver.find_element(By.CLASS_NAME, "login-button").click()
		return LoginModal(driver)

class LoginModal:
	def __init__(self, driver):
		self._driver = driver		
		#WebDriverWait(self._driver, 10)#.until(EC.presence_of_element_located(By.ID, "username-login-username"))
		print "here"

	def LoginWithUserName(self, username, password):
		self._driver.find_element(By.CLASS_NAME, "login-username-link").click()
		self._driver.find_element(By.ID, "username-login-username").send_keys(username)
		self._driver.find_element(By.ID, "username-login-password").send_keys(password)
		self._driver.find_element(By.ID, "username-login-submit").click()
		WaitForAjax(self._driver)
		print "did we wait?"
		# if self.

		# return self

userName = raw_input("fitocracy user name: ")
password = getpass.getpass("fitocracy password: ")

print userName
print password

# Create a new instance of the Firefox driver
driver = webdriver.Firefox()

loginPage = LoginPage(driver).OpenLoginModal()

# go to the google home page
# driver.get("http://www.google.com")

# # the page is ajaxy so the title is originally this:
# print driver.title

# # find the element that's name attribute is q (the google search box)
# inputElement = driver.find_element_by_name("q")

# # type in the search
# inputElement.send_keys("cheese!")

# # submit the form (although google automatically searches now without submitting)
# inputElement.submit()

# try:
#     # we have to wait for the page to refresh, the last thing that seems to be updated is the title
#     WebDriverWait(driver, 10).until(EC.title_contains("cheese!"))

#     # You should see "cheese! - Google Search"
#     print driver.title

# finally:
#driver.quit()
