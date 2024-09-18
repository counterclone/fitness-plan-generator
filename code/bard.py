import pathlib
import textwrap
import sys
import google.generativeai as genai
from IPython.display import display
from IPython.display import Markdown

age=sys.argv[1]
weight=sys.argv[2]
height=sys.argv[3]
goal=sys.argv[4]
diet=sys.argv[5]
exercise=sys.argv[6]

def to_markdown(text):
  text = text.replace('•', '  *')
  return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))

genai.configure(api_key='AIzaSyCu6jKPW33Tz1-cKLpuC_lwFhcdqGMZnr8')
model = genai.GenerativeModel('gemini-pro')

prompt="create a fitness plan for a person with age of "+str(age)+" weight of "+str(weight)+" who has a height of "+str(height)+". the person has following dietary preferences "+str(diet)+". the person has following exercise preferences "+str(exercise)+". the person has following goal to achieve "+str(goal)+". give the BMI of the person, the estimated time to achieve this goal and other suitable requirements and responses in 1500-2500 words."+"give the response in an html file>"
response = model.generate_content(prompt)
print(response.text)

