import openai
import os

openai.api_key = os.environ['OPENAI_KEY']

def get_situation():

    return {
        'situation_description': 'An old woman has just lost a cat and has asked for your help to find it. You are very busy and need to be on your way. You must deny her',
        'robot_name': 'Old Woman'
    }

def get_dialog(situation_dict):
    prompt = f"{situation_dict['situation_description']}\n{situation_dict['robot_name']}:"
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