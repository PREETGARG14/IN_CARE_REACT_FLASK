from sqlalchemy.orm import backref
from market import db,login_manager

from flask_login import UserMixin

@login_manager.user_loader
def load_user(user_id):
    return Patients.query.get(int(user_id))

class Model():
    def as_dict(self):
        return { c.name: getattr(self, c.name) for c in self.__table__.columns }

class Patients(db.Model, UserMixin,Model):
    __tablename__ = 'patients'
    id = db.Column(db.Integer(), primary_key=True)
    fullname = db.Column(db.String(length=30), nullable=False, unique=False)
    email_address = db.Column(db.String(length=50), nullable=False, unique=False)
    password_hash = db.Column(db.String(length=600), nullable=False)
    username = db.Column(db.String(length=30), nullable=False, unique=True)

    def __init__(self,fullname,email_address,password,username):
        self.fullname=fullname
        self.email_address=email_address
        self.password_hash=password
        self.username=username

    @property
    def password(self):
        return self.password

    @password.setter
    def password(self, plain_text_password):
        self.password_hash = plain_text_password

    def check_password_correction(self, attempted_password):
        return (self.password_hash, attempted_password)

class Doctor(db.Model, UserMixin):
    __tablename__ = 'admin'
    id = db.Column(db.Integer(), primary_key=True)
    fullname = db.Column(db.String(length=30), nullable=False, unique=True)
    email_address = db.Column(db.String(length=50), nullable=False, unique=True)
    password_hash = db.Column(db.String(length=60), nullable=False)
    def check_password_correction(self, attempted_password):
        return (self.password_hash, attempted_password)

class past_history_of_illness(db.Model , UserMixin, Model):
    __tablename__='past_history'
    id=db.Column(db.Integer(), primary_key=True)
    problem = db.Column(db.String(length=30), nullable=False)
    body_site=db.Column(db.String(length=30), nullable=False)
    dateTime = db.Column(db.String(), nullable = False)
    severity = db.Column(db.String(length=30), nullable=False)
    last_updated=db.Column(db.String(), nullable = False)
    user_id=db.Column(db.Integer(),db.ForeignKey('patients.id'))
    user=db.relationship('Patients',backref='past_history')   

class Prescription(db.Model,Model):
    __tablename__='prescriptions'
    prescriptionID=db.Column(db.String(), primary_key=True)
    medItem=db.Column(db.String())
    prepSubstanceName=db.Column(db.String())
    prepForm=db.Column(db.String())
    prepStrength=db.Column(db.Float())
    prepStrengthUnit=db.Column(db.String())
    diluentAmount=db.Column(db.Float())
    diluentUnit=db.Column(db.String())
    ingredientSubstanceName=db.Column(db.String())
    ingredientForm=db.Column(db.String())
    ingredientCategory=db.Column(db.String())
    ingredientStrength=db.Column(db.Float())
    ingredientStrengthUnit=db.Column(db.String())
    ingredientDescription=db.Column(db.String())
    ingredientAmount=db.Column(db.Float())
    ingredientAmountUnit=db.Column(db.String())
    ingredientRole=db.Column(db.String())
    ingredientRole2=db.Column(db.String())
    medDescription=db.Column(db.String())
    medRoute=db.Column(db.String())
    medDosageInstructions=db.Column(db.String())
    doseAmount=db.Column(db.Float())
    doseAmountLower=db.Column(db.Float())
    doseAmountUpper=db.Column(db.Float())
    doseUnit=db.Column(db.String())
    doseTimingFreq=db.Column(db.Float())
    doseTimingFreqUnit=db.Column(db.String())
    doseTimingFreqLower=db.Column(db.Float())
    doseTimingFreqLowerUnit=db.Column(db.String())
    doseTimingFreqUpper=db.Column(db.Float())
    doseTimingFreqUpperUnit=db.Column(db.String())
    doseTimingInterval=db.Column(db.String())
    doseSpecificTime=db.Column(db.String())
    doseNamedTimeEvent=db.Column(db.String())
    doseNamedTimeEvent2=db.Column(db.String())
    doseExactTimingCritical=db.Column(db.Boolean())
    doseAsRequired=db.Column(db.Boolean())
    doseAsRequiredCriterion=db.Column(db.String())
    infusionAdminRateQ=db.Column(db.Float())
    infusionAdminRateUnit=db.Column(db.String())
    infusionAdminRateT=db.Column(db.String())
    doseAdminDuration=db.Column(db.String())
    doseDirectionDuration1=db.Column(db.String())
    doseDirectionDuration2=db.Column(db.String())
    directionRepetitionInterval=db.Column(db.String())
    directionSpecificDate=db.Column(db.String())
    directionSpecificTime=db.Column(db.String())
    directionSpecificDoW=db.Column(db.Integer())
    directionSpecificDoM=db.Column(db.Integer())
    directionEventName=db.Column(db.String())
    directionEventStartInterval=db.Column(db.String())
    safetyMaxAmount=db.Column(db.Float())
    safetyMaxAmountUnit=db.Column(db.String())
    safetyAllowedPeriod=db.Column(db.String())
    overrideReason=db.Column(db.String())
    orderAdditionalInstructions=db.Column(db.String())
    orderReason=db.Column(db.String())
    courseStatus=db.Column(db.String())
    courseDiscontinuedDate=db.Column(db.String())
    courseDiscontinuedTime=db.Column(db.String())
    courseWrittenDate=db.Column(db.String())
    courseWrittenTime=db.Column(db.String())
    authNumberofRepeatsAllowed=db.Column(db.Integer())
    authValidityPeriodDate=db.Column(db.String())
    authValidityPeriodTime=db.Column(db.String())
    dispenseInstruction=db.Column(db.String())
    dispenseAmountDescription=db.Column(db.String())
    dispenseAmount=db.Column(db.Float())
    dispenseAmountUnits=db.Column(db.String())
    dispenseDurationofSupply=db.Column(db.String())
    orderComment=db.Column(db.String())
    orderID=db.Column(db.String())
    userID=db.Column(db.Integer(),db.ForeignKey('patients.id'))
    user=db.relationship('Patients',backref='prescriptions')

class immunisation(db.Model , UserMixin, Model):
    __tablename__='immunisation'
    id=db.Column(db.Integer(), primary_key=True)
    immunisation_item = db.Column(db.String(length=30), nullable=False)
    route=db.Column(db.String(length=30), nullable=False)
    target_site = db.Column(db.String(length=30), nullable = False)
    sequence_no = db.Column(db.Integer(), nullable=False)
    user_id=db.Column(db.Integer(),db.ForeignKey('patients.id'))
    user=db.relationship('Patients',backref='immunisation')

db.create_all()
db.session.commit()
