from flask import Flask, render_template


power = [['I','V','X'],
         ['X','L','C'],
         ['C','D','M'],
         ['M']]

pattern = ['0','1','11','111','12','2','21','211','2111','13']

#using default flask routing /templates, /static etc
app = Flask(__name__)

@app.route('/areyounotentertained')
def index():
    #no jinja template in the html file, static html
    return render_template('roman.html')


@app.route('/performCalc/<input_text>')
#alternatively do error handling using "except Exception,e:" catch the error type
#and respond accordingly within the except
def mainLogic(input_text):
    #confirm it's a number
    if(input_text.isdigit()):
        #confirm it's within bounds
        if(int(input_text) > 3999):
            return '[' + '"' + 'Please enter a number, between 1-3999' + '"' + ']'

        #get the first power and continue from there
        curPow = len(input_text)-1

        #storing final return value
        finalString = ''

        #outside loop is used to match the number to the pattern
        for n in input_text:
            #inside loop is used to convert the pattern to the roman numerals
            for x in pattern[int(n)]:
                if(x == '0'):
                    #skip 0
                    continue
                finalString += power[int(curPow)][int(x)-1]
                #print(str(curPow) + " , " + str(x))
            curPow -= 1

        #jsonifying return string for javascript, could probably use jsonify here
        return '[' + '"' + finalString + '"' + ']'

    else:
        return '[' + '"' + 'Please enter a number, between 1-3999' + '"' + ']'