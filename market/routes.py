from crypt import methods
from flask import flash
from market import app
from flask import render_template, redirect, url_for,request , jsonify
from market.models import Patient,AdminUser, immunisation, past_history_of_illness
from market.forms import AdminEditImmunisation, RegisterForm, LoginForm,PurchaseItemForm,SellItemForm,AdminLoginForm, AdminAddPatientForm
from market import db
from flask_login import login_user,logout_user,login_required,current_user , login_manager
from market.processor import chatbot_response
from functools import wraps
# from processor import chatbot_response
# imports for PyJWT authentication
import jwt

app.config['SECRET_KEY'] = 'keyissecured12123'
token = ""
patientid = 0

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
    return render_template('home.html')


@app.route('/market', methods=['GET', 'POST'])
@login_required
def market_page():  
    # purchase_form = PurchaseItemForm()
    # selling_form = SellItemForm()
    if request.method == "POST":
        #Purchase Item Logic
        # purchased_item = request.form.get('purchased_item')
        # p_item_object = Item.query.filter_by(name=purchased_item).first()
        # if p_item_object:
        #     if current_user.can_purchase(p_item_object):
        #         p_item_object.buy(current_user)
        #         flash(f"Congratulations! You purchased {p_item_object.name} for Rs {p_item_object.price}", category='success')
        #     else:
        #         flash(f"Unfortunately, you don't have enough money to purchase {p_item_object.name}!", category='danger')
        # #Sell Item Logic
        # sold_item = request.form.get('sold_item')
        # s_item_object = Item.query.filter_by(name=sold_item).first()
        # if s_item_object:
        #     if current_user.can_sell(s_item_object):
        #         s_item_object.sell(current_user)
        #         flash(f"Congratulations! You sold {s_item_object.name} back to market!", category='success')
        #     else:
        #         flash(f"Something went wrong with selling {s_item_object.name}", category='danger')

        return redirect(url_for('market_page'))

    if request.method == "GET":
        # items = Item.query.filter_by(owner=None)
        past_hist=past_history_of_illness.query.order_by(past_history_of_illness.id.asc())
        print(current_user.get_id())
        past_history = past_history_of_illness.query.filter_by(user_id = current_user.get_id())
        return render_template('market.html', past_history = past_history) 


@app.route('/register', methods=['GET', 'POST'])
def register_page():
    form = RegisterForm()
    if form.validate_on_submit():
        user_to_create = Patient(username=form.username.data,
                              email_address=form.email_address.data,
                              password_hash=form.password1.data)
        db.session.add(user_to_create)
        db.session.commit()
        login_user(user_to_create)
        flash(f"Account created successfully! You are now logged in as {user_to_create.username}", category='success')
        
        return redirect(url_for('market_page'))
    if form.errors != {}:  # If there are not errors from the validations
        for err_msg in form.errors.values():
            flash(
                f'There was an error with creating a user: {err_msg}', category='danger')

    return render_template('register.html', form=form)


@app.route('/login', methods=['GET', 'POST'])
def login_page():
    form = LoginForm()
    if form.validate_on_submit():
        attempted_user = Patient.query.filter_by(
            username=form.username.data).first()
        if attempted_user and attempted_user.check_password_correction(attempted_password=form.password.data):
            login_user(attempted_user)
            
            flash(
                f'Success! You are logged in as: {attempted_user.username}', category='success')
            return redirect(url_for('market_page'))
        else:
            flash('Username and password are not match! Please try again',
                  category='danger')

    return render_template('login.html', form=form)


@app.route('/logout')
def logout_page():
    logout_user()
    flash("You have been logged out!", category='info')
    return redirect(url_for("home_page"))


@app.route('/admin', methods=['GET', 'POST'])
def admin_login_page():
    form = AdminLoginForm()
    patients =  db.session.query(Patient).filter()

    if form.validate_on_submit():
        # result = db.session.query(Admins).filter(Admins.email==email, Admins.password==password)

        attempted_user = AdminUser.query.filter_by(username=form.username.data , password_hash = form.password.data)
        if (attempted_user):
        # login_user(attempted_user)
            # flash(f'Success! You are logged in as: {attempted_user.username}(Admin)', category='success')
            return redirect(url_for('add_product_page' , products = patients))
        else:
            flash('Username and password are not match! Please try again', category='danger')

    return render_template('adminlogin.html', form=form)

@app.route('/admin/addproducts', methods=['GET', 'POST'])
def add_product_page():
    # form = AdminAddProductForm()
    past_history = past_history_of_illness.query.filter_by(user_id = current_user.get_id())
    products =  db.session.query(Patient).filter()
    # print(products)
    # if form.validate_on_submit():
        
    #     product_information = Item(name=form.name.data,
    #                         price=form.price.data,
    #                         barcode=form.barcode.data,
    #                         description = form.description.data)
    #     product_update = db.session.query(User).filter_by().first()
    #     if(product_update):
    #         product_update.name = product_information.name
    #         product_update.price = product_information.price
    #         product_update.barcode = product_information.barcode
    #         product_update.description = product_information.description
    #         db.session.commit() 
    #         print(product_update.name)
    #     else:
    #         db.session.add(product_information)
    #         db.session.commit()
    #         # login_user(user_to_create)
    #         flash(f"Product {product_information.name} added successfully", category='success')
    #         return redirect(url_for('add_product_page' , form=form , products = products))
    # if form.errors != {}: #If there are not errors from the validations
    #     for err_msg in form.errors.values():
    #         flash(f'There was an error with creating a user: {err_msg}', category='danger')
        
    return render_template('adminpage.html', products = products , past_history = past_history)
@app.route('/admin/<int:page_id>' , methods = ['GET'])
def edit_details(page_id):
    form = AdminAddPatientForm()
    form2 = AdminEditImmunisation()
    if request.method == "GET":
        patient_immunisation_table = immunisation.query.filter_by(user_id = page_id)

        past_hist=past_history_of_illness.query.order_by(past_history_of_illness.id.asc())
        # print(current_user.get_id())
        past_history = past_history_of_illness.query.filter_by(user_id = page_id)
        return render_template('edit_details.html', past_history = past_history , form = form , form2 = form2, immunisation = patient_immunisation_table)
        
@app.login_manager.unauthorized_handler     # In unauthorized_handler we have a callback URL 
def unauthorized_callback():            # In call back url we can specify where we want to 
       return redirect(url_for('admin_login_page'))
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
            current_user = AdminUser.query\
                .filter_by(id = data['id'])\
                .first()
        except:
            return jsonify({
                'message' : 'Token is invalid !!'
            }), 401
        # returns the current logged in users contex to the routes
        return  f(current_user, *args, **kwargs)
  
    return decorated


@app.route('/admin/<int:page_id>', methods=['GET', 'POST'])
def edit_patient_page(page_id):
    form = AdminAddPatientForm()
    past_history = past_history_of_illness.query.filter_by(user_id = page_id)
    patient_immunisation_table = immunisation.query.filter_by(user_id = page_id)
    patient =  db.session.query(Patient).filter()
    form2 = AdminEditImmunisation()
    # print(products)
    if form.validate_on_submit():
        
        patient_information = past_history_of_illness(
                            id = form.id.data,
                            problem=form.problem.data,
                            body_site=form.body_site.data,
                            dateTime=form.dateTime.data,
                            severity= form.severity.data,
                            last_updated = form.last_updated.data ,
                            user_id = page_id)
        print(patient_information.id)
        patient_update = db.session.query(past_history_of_illness).filter_by(id = patient_information.id).first()
        if(patient_update):
            patient_update.problem = patient_information.problem
            patient_update.body_site = patient_information.body_site
            patient_update.dateTime = patient_information.dateTime
            patient_update.severity = patient_information.severity
            patient_update.last_updated = patient_information.last_updated
            db.session.commit()
        else:
            db.session.add(patient_information)
            db.session.commit()
            # login_user(user_to_create)
            flash(f"Product {patient_information.id} added successfully", category='success')
            return redirect(url_for('edit_patient_page' ,page_id = page_id ,form=form , products = patient))
    # if form.errors != {}: #If there are not errors from the validations
    #     for err_msg in form.errors.values():
    #         flash(f'There was an error with creating a user: {err_msg}', category='danger')
    if form2.validate_on_submit():
        patient_immunisation = immunisation(id = form2.id.data,
                                            immunisation_item = form2.immunisation_item.data,
                                            route = form2.route.data,
                                            target_site = form2.target_site.data,
                                            sequence_no = form2.sequence_no.data,
                                            user_id = page_id)
        patient_immunisation_update = db.session.query(immunisation).filter_by(id =  patient_immunisation.id).first()
        if(patient_immunisation_update):
            patient_immunisation_update.immunisation_item = patient_immunisation.immunisation_item
            patient_immunisation_update.route = patient_immunisation.route
            patient_immunisation_update.target_site = patient_immunisation.target_site
            patient_immunisation_update.sequence_no = patient_immunisation.sequence_no
            db.session.commit()  
        else:
            db.session.add(patient_immunisation)
            db.session.commit()
            # login_user(user_to_create)
            flash(f"Product {patient_immunisation.id} added successfully", category='success')
    
    return render_template('edit_details.html', past_history = past_history , immunisation = patient_immunisation_table , form = form , form2 = form2)

      