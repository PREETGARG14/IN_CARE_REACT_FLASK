from xmlrpc.client import DateTime
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField,HiddenField , DateTimeLocalField , DateField , IntegerField
from wtforms.validators import Length, EqualTo, Email, DataRequired, ValidationError
from market.models import Patient, immunisation


class RegisterForm(FlaskForm):
    def validate_username(self, username_to_check):
        user = Patient.query.filter_by(username=username_to_check.data).first()
        if user:
            raise ValidationError('Username already exists! Please try a different username')

    def validate_email_address(self, email_address_to_check):
        email_address = Patient.query.filter_by(email_address=email_address_to_check.data).first()
        if email_address:
            raise ValidationError('Email Address already exists! Please try a different email address')

    username = StringField(label='User Name:', validators=[Length(min=2, max=30), DataRequired()])
    email_address = StringField(label='Email Address:', validators=[Email(), DataRequired()])
    password1 = PasswordField(label='Password:', validators=[Length(min=6), DataRequired()])
    password2 = PasswordField(label='Confirm Password:', validators=[EqualTo('password1'), DataRequired()])
    submit = SubmitField(label='Create Account')

class LoginForm(FlaskForm):
    username = StringField(label='User Name:', validators=[DataRequired()])
    password = PasswordField(label='Password:', validators=[DataRequired()])
    submit = SubmitField(label='Login')

class PurchaseItemForm(FlaskForm):
    submit = SubmitField(label='Purchase Item!')

class SellItemForm(FlaskForm):
    submit = SubmitField(label='Return Item!')


class AdminAddPatientForm(FlaskForm):
    id = IntegerField(label='id' , render_kw={'readonly': True})
    problem = StringField(label='Problem:', validators=[DataRequired()])
    body_site = StringField(label='Body Site:', validators=[DataRequired()])
    dateTime = DateField(label='dateTime', format='%Y-%m-%d',validators=[DataRequired()])
    severity = StringField(label='Severity:', validators=[DataRequired()])
    last_updated = DateField(label='lastUpdated' , validators=[DataRequired()])
    submit = SubmitField(label='Add Products')
class AdminLoginForm(FlaskForm):
    username = StringField(label='User Name:', validators=[DataRequired()])
    password = PasswordField(label='Password:', validators=[DataRequired()])
    submit = SubmitField(label='')

class AdminEditImmunisation(FlaskForm):
    id = IntegerField(label='id' , render_kw={'readonly': True})
    immunisation_item = StringField(label='Immunisation Item:', validators=[DataRequired()])
    route = StringField(label='Route', validators=[DataRequired()])
    target_site =   StringField(label='Target SIte',validators=[DataRequired()])
    sequence_no = StringField(label='Sequence', validators=[DataRequired()])
    submit = SubmitField(label='Add Products')

class AdminEditPrescription(FlaskForm):
    id = IntegerField(label='id' , render_kw={'readonly': True})
    medicinename = StringField(label='Medicine Name', validators=[DataRequired()])
    substancename = StringField(label='SUbstance Name', validators=[DataRequired()])
    medicinetype = StringField(label='Medicine Type', validators=[DataRequired()])
    dosagestrength = StringField(label='DOsage Strength', validators=[DataRequired()])
    unitstrength = StringField(label='Unit Strength', validators=[DataRequired()])
    methoddosage = StringField(label='DOsage Methoda', validators=[DataRequired()])
    instructiondosage = StringField(label='Dosage Interuction', validators=[DataRequired()])
    submit = SubmitField(label='Add Products')
