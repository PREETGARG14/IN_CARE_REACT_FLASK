from market import app

@app.route('/hello',methods=['GET'])
def hello():
    return 'Hello World'

if __name__ == '__main__':
    app.run(host="0.0.0.0",debug=True)