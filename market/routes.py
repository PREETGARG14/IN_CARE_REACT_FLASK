from crypt import methods
from flask import flash
from market import app
from flask import render_template, redirect, url_for,request , jsonify
from market.models import Patients,Doctor, Prescription
from market.forms import RegisterForm, LoginForm,AdminLoginForm
from market import db
from flask_login import login_user,logout_user,login_required,current_user
from market.processor import chatbot_response
from functools import wraps
# from processor import chatbot_response
# imports for PyJWT authentication
import jwt

app.config['SECRET_KEY'] = 'keyissecured12123'
token = ""


@app.route('/index', methods=["GET", "POST"])
def index():
    return render_template('index.html', **locals())
    
@app.route('/chatbot', methods=["GET", "POST"])
def chatbotResponse():

    if request.method == 'POST':
        the_question = request.form['question']

        response = chatbot_response(the_question)

    return jsonify({"response": response })

@app.route("/cards")
def cards():
    return render_template('cards.html')

@app.route("/api/prescribe", methods=["GET", "POST"])
def add_prescription():
    
    if request.method == 'POST':
        prescriptionID=request.form.get('pi')
        medItem=request.form.get('Medication item')
        prepSubstanceName=request.form.get('Name')
        prepForm=request.form.get('Form')
        prepStrength=request.form.get('strength')
        prepStrengthUnit=request.form.get('strengthUnit')
        diluentAmount=request.form.get('numerator')
        diluentUnit=request.form.get('numeratorUnit')
        ingredientSubstanceName=request.form.get('substanceName')
        ingredientForm=request.form.get('ingredientForm')
        ingredientCategory=request.form.get('category')
        ingredientStrength=request.form.get('ingredientstrength')
        ingredientStrengthUnit=request.form.get('strengthUnit')
        ingredientDescription=request.form.get('medicationDescription')
        ingredientAmount=request.form.get('ingredient-amount')
        ingredientAmountUnit=request.form.get('ingredient-amountUnit')
        ingredientRole=request.form.get('roleStatus')
        ingredientRole=request.form.get('role')
        medDescription=request.form.get('description')
        medRoute=request.form.get('route')
        medDosageInstructions=request.form.get('dosageInstructions')
        doseAmount=request.form.get('doseAmount')
        doseAmountLower=request.form.get('doseAmountLower')
        doseAmountUpper=request.form.get('doseAmountUpper')
        doseUnit=request.form.get('doseUnit')
        doseTimingFreq=request.form.get('frequency')
        doseTimingFreqUnit=request.form.get('frequencyUnit')
        doseTimingFreqLower=request.form.get('frequencyLower')
        doseTimingFreqLowerUnit=request.form.get('frequencyLowerUnit')
        doseTimingFreqUpper=request.form.get('frequencyUpper')
        doseTimingFreqUpperUnit=request.form.get('frequencyUpperUnit')
        doseTimingInterval=request.form.get('interval')
        doseSpecificTime=request.form.get('st')
        doseNamedTimeEvent=request.form.get('nte')
        doseNamedTimeEvent2=request.form.get('nte2')
        doseExactTimingCritical=request.form.get('timeCritical')
        doseAsRequired=request.form.get('asRequired')
        doseAsRequiredCriterion=request.form.get('requiredcriterion')
        infusionAdminRateQ=request.form.get('iar')
        infusionAdminRateUnit=request.form.get('iarUnit')
        infusionAdminRateT=request.form.get('iar1')
        doseAdminDuration=request.form.get('administration')
        doseDirectionDuration1=request.form.get('directionDuration')
        doseDirectionDuration2=request.form.get('directionDuration2')
        directionRepetitionInterval=request.form.get('repetitionInterval')
        directionSpecificDate=request.form.get('specificDate')
        directionSpecificTime=request.form.get('specificTime')
        directionSpecificDoW=request.form.get('specificDayofweek')
        directionSpecificDoM=request.form.get('specificdayofmonth')
        directionEventName=request.form.get('eventName')
        directionEventStartInterval=request.form.get('eventStartInterval')
        safetyMaxAmount=request.form.get('maximumAmount')
        safetyMaxAmountUnit=request.form.get('maximumAmountDoseUnit')
        safetyAllowedPeriod=request.form.get('allowedPeriod')
        overrideReason=request.form.get('overrideReason')
        orderAdditionalInstructions=request.form.get('additionalInstructions')
        orderReason=request.form.get('reason')
        courseStatus=request.form.get('status')
        courseDiscontinuedDate=request.form.get('dateDiscontinued')
        courseDiscontinuedTime=request.form.get('timeDiscontinued')
        courseWrittenDate=request.form.get('dateWritten')
        courseWrittenTime=request.form.get('timeWritten')
        authNumberofRepeatsAllowed=request.form.get('nora')
        authValidityPeriodDate=request.form.get('validityPeriod')
        authValidityPeriodTime=request.form.get('validityPeriodTime')
        dispenseInstruction=request.form.get('dispenseInstructions')
        dispenseAmountDescription=request.form.get('amountDescription')
        dispenseAmount=request.form.get('amountindispense')
        dispenseAmountUnits=request.form.get('dispenseUnits')
        dispenseDurationofSupply=request.form.get('dos')
        orderComment=request.form.get('comment')
        orderID=request.form.get('identifier')

        prescription=Prescription(prescriptionID=prescriptionID,medItem=medItem,prepSubstanceName=prepSubstanceName,prepForm=prepForm,prepStrength=prepStrength,prepStrengthUnit=prepStrengthUnit,diluentAmount=diluentAmount,diluentUnit=diluentUnit,ingredientSubstanceName=ingredientSubstanceName,ingredientForm=ingredientForm,ingredientCategory=ingredientCategory,ingredientStrength=ingredientStrength,ingredientStrengthUnit=ingredientStrengthUnit,ingredientDescription=ingredientDescription,ingredientAmount=ingredientAmount,ingredientAmountUnit=ingredientAmountUnit,ingredientRole=ingredientRole,medDescription=medDescription,medRoute=medRoute,medDosageInstructions=medDosageInstructions,doseAmount=doseAmount,doseAmountLower=doseAmountLower,doseAmountUpper=doseAmountUpper,doseUnit=doseUnit,doseTimingFreq=doseTimingFreq,doseTimingFreqUnit=doseTimingFreqUnit,doseTimingFreqLower=doseTimingFreqLower,doseTimingFreqLowerUnit=doseTimingFreqLowerUnit,doseTimingFreqUpper=doseTimingFreqUpper,doseTimingFreqUpperUnit=doseTimingFreqUpperUnit,doseTimingInterval=doseTimingInterval,doseSpecificTime=doseSpecificTime,doseNamedTimeEvent=doseNamedTimeEvent,doseExactTimingCritical=doseExactTimingCritical,doseAsRequired=doseAsRequired,doseAsRequiredCriterion=doseAsRequiredCriterion,infusionAdminRateQ=infusionAdminRateQ,infusionAdminRateUnit=infusionAdminRateUnit,infusionAdminRateT=infusionAdminRateT,doseAdminDuration=doseAdminDuration,doseDirectionDuration1=doseDirectionDuration1,doseDirectionDuration2=doseDirectionDuration2,directionRepetitionInterval=directionRepetitionInterval,directionSpecificDate=directionSpecificDate,directionSpecificTime=directionSpecificTime,directionSpecificDoW=directionSpecificDoW,directionSpecificDoM=directionSpecificDoM,directionEventName=directionEventName,directionEventStartInterval=directionEventStartInterval,safetyMaxAmount=safetyMaxAmount,safetyMaxAmountUnit=safetyMaxAmountUnit,safetyAllowedPeriod=safetyAllowedPeriod,overrideReason=overrideReason,orderAdditionalInstructions=orderAdditionalInstructions,orderReason=orderReason,courseStatus=courseStatus,courseDiscontinuedDate=courseDiscontinuedDate,courseDiscontinuedTime=courseDiscontinuedTime,courseWrittenDate=courseWrittenDate,courseWrittenTime=courseWrittenTime,authNumberofRepeatsAllowed=authNumberofRepeatsAllowed,authValidityPeriodDate=authValidityPeriodDate,authValidityPeriodTime=authValidityPeriodTime,dispenseInstruction=dispenseInstruction,dispenseAmountDescription=dispenseAmountDescription,dispenseAmount=dispenseAmount,dispenseAmountUnits=dispenseAmountUnits,dispenseDurationofSupply=dispenseDurationofSupply,orderComment=orderComment,orderID=orderID)    
        db.session.add(prescription)
        db.session.commit()
    return render_template('prescription.html')

@app.route("/api/prescriptionSuccessful", methods=["GET","POST"])
def pres():
    return render_template('abc.html')

@app.route("/")
@app.route('/home')
def home_page():
    return render_template('abc.html')


# @app.route('/market', methods=['GET', 'POST'])
# @login_required
# def market_page():
#     purchase_form = PurchaseItemForm()
#     selling_form = SellItemForm()
#     if request.method == "POST":
#         #Purchase Item Logic
#         purchased_item = request.form.get('purchased_item')
#         p_item_object = Item.query.filter_by(name=purchased_item).first()
#         if p_item_object:
#             if current_user.can_purchase(p_item_object):
#                 p_item_object.buy(current_user)
#                 flash(f"Congratulations! You purchased {p_item_object.name} for Rs {p_item_object.price}", category='success')
#             else:
#                 flash(f"Unfortunately, you don't have enough money to purchase {p_item_object.name}!", category='danger')
#         #Sell Item Logic
#         sold_item = request.form.get('sold_item')
#         s_item_object = Item.query.filter_by(name=sold_item).first()
#         if s_item_object:
#             if current_user.can_sell(s_item_object):
#                 s_item_object.sell(current_user)
#                 flash(f"Congratulations! You sold {s_item_object.name} back to market!", category='success')
#             else:
#                 flash(f"Something went wrong with selling {s_item_object.name}", category='danger')

#         return redirect(url_for('market_page'))

#     if request.method == "GET":
#         # items = Item.query.filter_by(owner=None)
#         items=Item.query.order_by(Item.id.asc())
#         owned_items = Item.query.filter_by(owner=current_user.id)
#         return render_template('market.html', items=items, purchase_form=purchase_form, owned_items=owned_items, selling_form=selling_form) 


@app.route('/api/register', methods=['GET', 'POST'])
def register_page():
    form = RegisterForm()
    if form.validate_on_submit():
        user_to_create = Patients(fullname=form.fullname.data,
                              email_address=form.email_address.data,
                              password_hash=form.password1.data,
                              uniq_id=form.uniq_id.data)
                              # age=form.age.data,
                              # gender=form.gender.data

        db.session.add(user_to_create)
        db.session.commit()
        login_user(user_to_create)
        flash(f"Account created successfully! You are now logged in as {user_to_create.fullname}", category='success')
        # return redirect(url_for('user_home'))
        result={
        "status":"unsuccessful",
        "uniq_id":{user_to_create.uniq_id}
        }
        return jsonify(result)
    if form.errors != {}:  # If there are not errors from the validations
        for err_msg in form.errors.values():
            flash(
                f'There was an error with creating a user: {err_msg}', category='danger')

    # return render_template('register.html', form=form)
    result={
        "status":"unsuccessful"
    }
    return jsonify(result)

@app.route('/api/login', methods=['GET', 'POST'])
def login_page():
    form = LoginForm()
    if form.validate_on_submit():
        attempted_user = Patients.query.filter_by(uniq_id=form.uniq_id.data).first()
        if attempted_user and attempted_user.check_password_correction(attempted_password=form.password.data):
            login_user(attempted_user)
            flash(
                f'Success! You are logged in as: {attempted_user.fullname}', category='success')
            # return redirect(url_for('home_page'))
            id={attempted_user.uniq_id}
            result={
                    "status":"successful",
                    "uniq_id":str(id)
                    }
            return jsonify(result)
        else:
            flash('Username and password are not match! Please try again',
                  category='danger')

    return render_template('login.html', form=form)

@app.route('/api/logout')
def logout_page():
    logout_user()
    flash("You have been logged out!", category='info')
    return redirect(url_for("home_page"))



@app.route('/api/doctor', methods=['GET', 'POST'])
def admin_login_page():
    form = AdminLoginForm()
    patients =  db.session.query(Patients).filter()

    if form.validate_on_submit():
        # result = db.session.query(Admins).filter(Admins.email==email, Admins.password==password)

        attempted_user = Doctor.query.filter_by(username=form.username.data , password_hash = form.password.data)
        if (attempted_user):
        # login_user(attempted_user)
            # flash(f'Success! You are logged in as: {attempted_user.username}(Admin)', category='success')
            return redirect(url_for('patients_list' , patients = patients))
        else:
            flash('Username and password are not match! Please try again', category='danger')

    return render_template('adminlogin.html', form=form)





# Rest API
@app.route("/api/login2", methods=['GET','POST'])
def login():
    uniq_id=request.json['uniq_id']
    password=request.json['password']
    attempted_user = Patients.query.filter_by(uniq_id=uniq_id).first()
    if attempted_user and attempted_user.check_password_correction(attempted_password=password):
        login_user(attempted_user)
        result={
                "status":"successful",
                "uniq_id":str(uniq_id)
                }
        return jsonify(result)
    else:
        result={
                "status":"unsuccessful",
                "uniq_id":uniq_id
                }
        return jsonify(result)

# @app.route('/admin/addproducts', methods=['GET', 'POST'])
# def add_product_page():
#     form = AdminAddProductForm()
#     products =  db.session.query(Item).filter()
#     print(products)
#     if form.validate_on_submit():
        
#         product_information = Item(name=form.name.data,
#                             price=form.price.data,
#                             barcode=form.barcode.data,
#                             description = form.description.data)
#         product_update = db.session.query(Item).filter_by(barcode= product_information.barcode).first()
#         if(product_update):
#             product_update.name = product_information.name
#             product_update.price = product_information.price
#             product_update.barcode = product_information.barcode
#             product_update.description = product_information.description
#             db.session.commit() 
#             print(product_update.name)
#         else:
#             db.session.add(product_information)
#             db.session.commit()
#             # login_user(user_to_create)
#             flash(f"Product {product_information.name} added successfully", category='success')
#             return redirect(url_for('add_product_page' , form=form , products = products))
#     if form.errors != {}: #If there are not errors from the validations
#         for err_msg in form.errors.values():
#             flash(f'There was an error with creating a user: {err_msg}', category='danger')
        
#     return render_template('adminpage.html', form=form , products = products)


# decorator for verifying the JWT
def token_required(f):
	@wraps(f)
	def decorated(*args, **kwargs):
		token = None
		# jwt is passed in the request header
		if 'x-access-token' in request.headers:
			token = request.headers['x-access-token']
		# return 401 if token is not passed
		if not token:
			return jsonify({'message' : 'Token is missing !!'}), 401

		try:
			# decoding the payload to fetch the stored details
			data = jwt.decode(token, app.config['SECRET_KEY'])
			current_user = Patients.query\
				.filter_by(public_id = data['public_id'])\
				.first()
		except:
			return jsonify({
				'message' : 'Token is invalid !!'
			}), 401
		# returns the current logged in users contex to the routes
		return f(current_user, *args, **kwargs)

	return decorated