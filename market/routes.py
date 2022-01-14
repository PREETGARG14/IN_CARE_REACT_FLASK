import re
from flask import flash, json
from market import app
from flask import render_template, redirect, url_for,request , jsonify
from market.models import Patients,Doctor,Prescription,past_history_of_illness
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
                              username=form.username.data)
                              # age=form.age.data,
                              # gender=form.gender.data

        db.session.add(user_to_create)
        db.session.commit()
        login_user(user_to_create)
        flash(f"Account created successfully! You are now logged in as {user_to_create.fullname}", category='success')
        # return redirect(url_for('user_home'))
        result={
        "status":"unsuccessful",
        "username":{user_to_create.username}
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
        attempted_user = Patients.query.filter_by(username=form.username.data).first()
        if attempted_user and attempted_user.check_password_correction(attempted_password=form.password.data):
            login_user(attempted_user)
            flash(
                f'Success! You are logged in as: {attempted_user.fullname}', category='success')
            # return redirect(url_for('home_page'))
            id={attempted_user.username}
            result={
                    "status":"successful",
                    "username":str(id)
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
    username=request.json['username']
    password=request.json['password']
    attempted_user = Patients.query.filter_by(username=username).first()
    if attempted_user and attempted_user.check_password_correction(attempted_password=password):
        login_user(attempted_user)
        result={
                "status":"successful",
                "username":username
                }
        return jsonify(result)
    else:
        result={
                "status":"unsuccessful",
                "username":username
                }
        return jsonify(result)
    
    
@app.route('/api/register2', methods=['GET', 'POST'])
def register():
    username=request.json['username']
    attempted_user = Patients.query.filter_by(username=username).first()
    if attempted_user is not None:
        result={
        "status":"unsuccessful",
        "username":username,
        "message":"The user already exists"
        }
        return jsonify(result)
    
    else:
        password=request.json['password']
        fullname=request.json['fullname']
        email_address=request.json['email_address']
        user_to_create = Patients(fullname,email_address,password,username)
        # age=form.age.data,
        # gender=form.gender.data

        db.session.add(user_to_create)
        db.session.commit()
        login_user(user_to_create)
        # flash(f"Account created successfully! You are now logged in as {user_to_create.fullname}", category='success')
        # return redirect(url_for('user_home'))
        result={
            "status":"successful",
            "username":username
            }
        return jsonify(result)
    
@app.route('/api/doctor2', methods=['GET', 'POST'])
def doctor():
    email_address=request.json['email_address']
    attempted_doctor = Doctor.query.filter_by(email_address=email_address).first()
    if attempted_doctor is None:
        result={
        "status":"unsuccessful",
        "email_address":email_address,
        "message":"The doctor does not exist"
        }
        return jsonify(result)
    
    else:
        password=request.json['password']
        # fullname=request.json['fullname']
        if attempted_doctor.check_password_correction(attempted_password=password):
            login_user(attempted_doctor)
            result={
                "status":"successful",
                "email_address":email_address
                }
            return jsonify(result)
        else:
            result={
                "status":"unsuccessful",
                "email_address":email_address,
                "message":"Invalid password provided"
                }
            return jsonify(result)

@app.route("/api/prescribe", methods=["GET", "POST"])
def add_prescription1():
    return render_template("prescribe.html")

@app.route("/api/prescribe2/<int:user_id>", methods=["GET", "POST"])
def add_prescription(user_id):
   if request.json['pi'] is not None:
       prescriptionID=request.json['pi']
   else:
       prescriptionID="Test009"
   medItem=request.json['Medication item']
   prepSubstanceName=request.json['Name']
   prepForm=request.json['Form']
   prepStrength=request.json['strength']
   prepStrengthUnit=request.json['strengthUnit']
   diluentAmount=request.json['numerator']
   diluentUnit=request.json['numeratorUnit']
   ingredientSubstanceName=request.json['substanceName']
   ingredientForm=request.json['ingredientForm']
   ingredientCategory=request.json['category']
   ingredientStrength=request.json['ingredientstrength']
   ingredientStrengthUnit=request.json['strengthUnit']
   ingredientDescription=request.json['medicationDescription']
   ingredientAmount=request.json['ingredient-amount']
   ingredientAmountUnit=request.json['ingredient-amountUnit']
   ingredientRole=request.json['roleStatus']
   ingredientRole2=request.json['role']
   medDescription=request.json['description']
   medRoute=request.json['route']
   medDosageInstructions=request.json['dosageInstructions']
   doseAmount=request.json['doseAmount']
   doseAmountLower=request.json['doseAmountLower']
   doseAmountUpper=request.json['doseAmountUpper']
   doseUnit=request.json['doseUnit']
   doseTimingFreq=request.json['frequency']
   doseTimingFreqUnit=request.json['frequencyUnit']
   doseTimingFreqLower=request.json['frequencyLower']
   doseTimingFreqLowerUnit=request.json['frequencyLowerUnit']
   doseTimingFreqUpper=request.json['frequencyUpper']
   doseTimingFreqUpperUnit=request.json['frequencyUpperUnit']
   doseTimingInterval=request.json['interval']
   doseSpecificTime=request.json['st']
   doseNamedTimeEvent=request.json['nte']
   doseNamedTimeEvent2=request.json['nte2']
   doseExactTimingCritical=request.json['timeCritical']
   doseAsRequired=request.json['asRequired']
   doseAsRequiredCriterion=request.json['requiredcriterion']
   infusionAdminRateQ=request.json['iar']
   infusionAdminRateUnit=request.json['iarUnit']
   infusionAdminRateT=request.json['iar1']
   doseAdminDuration=request.json['administration']
   doseDirectionDuration1=request.json['directionDuration']
   doseDirectionDuration2=request.json['directionDuration2']
   directionRepetitionInterval=request.json['repetitionInterval']
   directionSpecificDate=request.json['specificDate']
   directionSpecificTime=request.json['specificTime']
   directionSpecificDoW=request.json['specificDayofweek']
   directionSpecificDoM=request.json['specificdayofmonth']
   directionEventName=request.json['eventName']
   directionEventStartInterval=request.json['eventStartInterval']
   safetyMaxAmount=request.json['maximumAmount']
   safetyMaxAmountUnit=request.json['maximumAmountDoseUnit']
   safetyAllowedPeriod=request.json['allowedPeriod']
   overrideReason=request.json['overrideReason']
   orderAdditionalInstructions=request.json['additionalInstructions']
   orderReason=request.json['reason']
   courseStatus=request.json['status']
   courseDiscontinuedDate=request.json['dateDiscontinued']
   courseDiscontinuedTime=request.json['timeDiscontinued']
   courseWrittenDate=request.json['dateWritten']
   courseWrittenTime=request.json['timeWritten']
   authNumberofRepeatsAllowed=request.json['nora']
   authValidityPeriodDate=request.json['validityPeriod']
   authValidityPeriodTime=request.json['validityPeriodTime']
   dispenseInstruction=request.json['dispenseInstructions']
   dispenseAmountDescription=request.json['amountDescription']
   dispenseAmount=request.json['amountindispense']
   dispenseAmountUnits=request.json['dispenseUnits']
   dispenseDurationofSupply=request.json['dos']
   orderComment=request.json['comment']
   orderID=request.json['identifier']
   userID=user_id
   prescription=Prescription(prescriptionID=prescriptionID,medItem=medItem,prepSubstanceName=prepSubstanceName,prepForm=prepForm,prepStrength=prepStrength,prepStrengthUnit=prepStrengthUnit,diluentAmount=diluentAmount,diluentUnit=diluentUnit,ingredientSubstanceName=ingredientSubstanceName,ingredientForm=ingredientForm,ingredientCategory=ingredientCategory,ingredientStrength=ingredientStrength,ingredientStrengthUnit=ingredientStrengthUnit,ingredientDescription=ingredientDescription,ingredientAmount=ingredientAmount,ingredientAmountUnit=ingredientAmountUnit,ingredientRole=ingredientRole,ingredientRole2=ingredientRole2,medDescription=medDescription,medRoute=medRoute,medDosageInstructions=medDosageInstructions,doseAmount=doseAmount,doseAmountLower=doseAmountLower,doseAmountUpper=doseAmountUpper,doseNamedTimeEvent2=doseNamedTimeEvent2,doseUnit=doseUnit,doseTimingFreq=doseTimingFreq,doseTimingFreqUnit=doseTimingFreqUnit,doseTimingFreqLower=doseTimingFreqLower,doseTimingFreqLowerUnit=doseTimingFreqLowerUnit,doseTimingFreqUpper=doseTimingFreqUpper,doseTimingFreqUpperUnit=doseTimingFreqUpperUnit,doseTimingInterval=doseTimingInterval,doseSpecificTime=doseSpecificTime,doseNamedTimeEvent=doseNamedTimeEvent,doseExactTimingCritical=doseExactTimingCritical,doseAsRequired=doseAsRequired,doseAsRequiredCriterion=doseAsRequiredCriterion,infusionAdminRateQ=infusionAdminRateQ,infusionAdminRateUnit=infusionAdminRateUnit,infusionAdminRateT=infusionAdminRateT,doseAdminDuration=doseAdminDuration,doseDirectionDuration1=doseDirectionDuration1,doseDirectionDuration2=doseDirectionDuration2,directionRepetitionInterval=directionRepetitionInterval,directionSpecificDate=directionSpecificDate,directionSpecificTime=directionSpecificTime,directionSpecificDoW=directionSpecificDoW,directionSpecificDoM=directionSpecificDoM,directionEventName=directionEventName,directionEventStartInterval=directionEventStartInterval,safetyMaxAmount=safetyMaxAmount,safetyMaxAmountUnit=safetyMaxAmountUnit,safetyAllowedPeriod=safetyAllowedPeriod,overrideReason=overrideReason,orderAdditionalInstructions=orderAdditionalInstructions,orderReason=orderReason,courseStatus=courseStatus,courseDiscontinuedDate=courseDiscontinuedDate,courseDiscontinuedTime=courseDiscontinuedTime,courseWrittenDate=courseWrittenDate,courseWrittenTime=courseWrittenTime,authNumberofRepeatsAllowed=authNumberofRepeatsAllowed,authValidityPeriodDate=authValidityPeriodDate,authValidityPeriodTime=authValidityPeriodTime,dispenseInstruction=dispenseInstruction,dispenseAmountDescription=dispenseAmountDescription,dispenseAmount=dispenseAmount,dispenseAmountUnits=dispenseAmountUnits,dispenseDurationofSupply=dispenseDurationofSupply,orderComment=orderComment,orderID=orderID,userID=userID)    
   db.session.add(prescription)
   db.session.commit()
   result={
          "pi":prescriptionID,
   }
   return jsonify(result)

@app.route("/api/prescribe3/<int:pid>", methods=["GET"])
def get_prescription(pid):
        prescriptions = Prescription.query.filter_by(userID = pid)
        s = json.dumps([r.as_dict() for r in prescriptions])
        return s
        

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


@app.route('/api/admin/<int:page_id>', methods=['GET', 'POST'])
@login_required
def edit_patient_page(page_id):
    if request.method == 'POST':
        past_history = past_history_of_illness.query.filter_by(user_id = page_id)
        patient =  db.session.query(Patients).filter()
        patient_information = past_history_of_illness(problem=request.json['problem'],
                            body_site=request.json['body_site'],
                            dateTime=request.json['dateTime'],
                            severity= request.json['severity'],
                            last_updated = request.json['last_updated'],
                            user_id = page_id)

        patient_update = db.session.query(past_history_of_illness).filter_by(id = patient_information.id).first()
        if(patient_update):
            patient_update.problem = patient_information.problem
            patient_update.body_site = patient_information.body_site
            patient_update.dateTime = patient_information.dateTime
            patient_update.severity = patient_information.severity
            patient_update.last_updated = patient_information.last_updated
            db.session.commit() 
            # print(product_update.name)
        else:
            db.session.add(patient_information)
            db.session.commit()
            # login_user(user_to_create)
            result={
                "status":"successful",
                "page_id":page_id
            }
            return jsonify(result)
    
    else:
        past_history = past_history_of_illness.query.filter_by(user_id = page_id)
        s = json.dumps([r.as_dict() for r in past_history])
        # , default=alchemyencoder
        return s
        
# def alchemyencoder(obj):
#     """JSON encoder function for SQLAlchemy special classes."""
#     if isinstance(obj, datetime.date):
#         return obj.isoformat()
#     elif isinstance(obj, decimal.Decimal):
#         return float(obj)