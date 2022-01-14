from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField,HiddenField
from wtforms.validators import Length, EqualTo, Email, DataRequired, ValidationError
from market.models import Patients


class RegisterForm(FlaskForm):
    def validate_username(self, username_given):
        user = Patients.query.filter_by(username=username_given.data).first()
        if user:
            raise ValidationError('Username already exists! Please try a different username')

    def validate_email_address(self, email_address_to_check):
        email_address = Patients.query.filter_by(email_address=email_address_to_check.data).first()
        if email_address:
            raise ValidationError('Email Address already exists! Please try a different email address')

    fullname = StringField(label='Full Name:', validators=[Length(min=2, max=30), DataRequired()])
    email_address = StringField(label='Email Address:', validators=[Email(), DataRequired()])
    password1 = PasswordField(label='Password:', validators=[Length(min=6), DataRequired()])
    password2 = PasswordField(label='Confirm Password:', validators=[EqualTo('password1'), DataRequired()])
    username = StringField(label='Username:', validators=[Length(min=8, max=30), DataRequired()])
#    age = StringField(label='Age:', validators=[Length(min=1, max=2), DataRequired()])
    submit = SubmitField(label='Create Account')

class LoginForm(FlaskForm):
    username = StringField(label='Unique Id:', validators=[DataRequired()])
    password = PasswordField(label='Password:', validators=[DataRequired()])
    submit = SubmitField(label='Login')

class AdminLoginForm(FlaskForm):
    username = StringField(label='Unique Id:', validators=[DataRequired()])
    password = PasswordField(label='Password:', validators=[DataRequired()])
    submit = SubmitField(label='Sign in')
