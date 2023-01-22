import openai
import os

openai.api_key = os.environ['OPENAI_KEY']

def get_situation():

    return {
        'situation_description': 'You are an old woman who has just lost a cat and has asked for help to find it, but the person you are talking to has refused to help you.',
        'robot_name': 'Old Woman'
    }

def get_dialog(prompt):
    completions = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=2048,
        n=1,
        stop=None,
        temperature=0.5
    )
    message = completions.choices[0].text
    return message
