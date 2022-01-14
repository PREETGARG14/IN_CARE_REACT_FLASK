from market import db,login_manager
from flask_login import UserMixin

@login_manager.user_loader
def load_user(user_id):
    return Patients.query.get(int(user_id)) 

class Patients(db.Model, UserMixin):
    __tablename__ = 'patients'
    id = db.Column(db.String(), primary_key=True)
    fullname = db.Column(db.String(length=30), nullable=False)
    email_address = db.Column(db.String(length=50), nullable=False)
    password_hash = db.Column(db.String(length=600), nullable=False)
    uniq_id = db.Column(db.String(length=30), nullable=False, unique=True)
    # age = db.Column(db.String(), nullable=False, default=0)
    # Gender = db.Column(db.String(length=6), nullable=False, unique=True)

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
    id = db.Column(db.String(), primary_key=True)
    fullname = db.Column(db.String(length=30), nullable=False, unique=True)
    email_address = db.Column(db.String(length=50), nullable=False, unique=True)
    password_hash = db.Column(db.String(length=60), nullable=False)


# class Item(db.Model):
#     id = db.Column(db.String(), primary_key=True)
#     name = db.Column(db.String(length=30), nullable=False, unique=True)
#     price = db.Column(db.String(), nullable=False)
#     barcode = db.Column(db.String(length=12), nullable=False, unique=True)
#     description = db.Column(db.String(length=1024), nullable=False, unique=True)
#     owner= db.Column(db.String(),db.ForeignKey('users.id'))
#     def __repr__(self):
#         return f'Item {self.name}'

#     def buy(self, user):
#         self.owner = user.id
#         user.budget += self.price
#         db.session.commit()

#     def sell(self, user):
#         self.owner = None
#         user.budget -= self.price
#         db.session.commit()

class immunisation:
    _tablename_='immunisation'
    id=db.Column(db.Integer(), primary_key=True)
    immunisation_item = db.Column(db.String(length=30), nullable=False)
    route=db.Column(db.String(length=30), nullable=False)
    target_site = db.Column(db.DateTime, nullable = False)
    sequence_no = db.Column(db.Integer(length=30), nullable=False)
    user_id=db.Column(db.Integer(),db.ForeignKey('users.id'))
    user=db.relationship('User',backref='immunisation')
    
class Prescription(db.Model):
    __tablename__='prescriptions'
    pid=db.Column(db.Integer(), primary_key=True)
    medItem=db.Column(db.String())
    prepSubstanceName=db.Column(db.String())
    prepForm=db.Column(db.String())
    prepStrength=db.Column(db.String())
    prepStrengthUnit=db.Column(db.String())
    diluentAmount=db.Column(db.String())
    diluentUnit=db.Column(db.String())
    ingredientSubstanceName=db.Column(db.String())
    ingredientForm=db.Column(db.String())
    ingredientCategory=db.Column(db.String())
    ingredientStrength=db.Column(db.String())
    ingredientStrengthUnit=db.Column(db.String())
    ingredientDescription=db.Column(db.String())
    ingredientAmount=db.Column(db.String())
    ingredientAmountUnit=db.Column(db.String())
    ingredientRole=db.Column(db.String())
    ingredientRole2=db.Column(db.String())
    medDescription=db.Column(db.String())
    medRoute=db.Column(db.String())
    medDosageInstructions=db.Column(db.String())
    doseAmount=db.Column(db.String())
    doseAmountLower=db.Column(db.String())
    doseAmountUpper=db.Column(db.String())
    doseUnit=db.Column(db.String())
    doseTimingFreq=db.Column(db.String())
    doseTimingFreqUnit=db.Column(db.String())
    doseTimingFreqLower=db.Column(db.String())
    doseTimingFreqLowerUnit=db.Column(db.String())
    doseTimingFreqUpper=db.Column(db.String())
    doseTimingFreqUpperUnit=db.Column(db.String())
    doseTimingInterval=db.Column(db.String())
    doseSpecificTime=db.Column(db.String())
    doseNamedTimeEvent=db.Column(db.String())
    doseNamedTimeEvent2=db.Column(db.String())
    doseExactTimingCritical=db.Column(db.Boolean())
    doseAsRequired=db.Column(db.Boolean())
    doseAsRequiredCriterion=db.Column(db.String())
    infusionAdminRateQ=db.Column(db.String())
    infusionAdminRateUnit=db.Column(db.String())
    infusionAdminRateT=db.Column(db.String())
    doseAdminDuration=db.Column(db.String())
    doseDirectionDuration1=db.Column(db.String())
    doseDirectionDuration2=db.Column(db.String())
    directionRepetitionInterval=db.Column(db.String())
    directionSpecificDate=db.Column(db.String())
    directionSpecificTime=db.Column(db.String())
    directionSpecificDoW=db.Column(db.String())
    directionSpecificDoM=db.Column(db.String())
    directionEventName=db.Column(db.String())
    directionEventStartInterval=db.Column(db.String())
    safetyMaxAmount=db.Column(db.String())
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
    authNumberofRepeatsAllowed=db.Column(db.String())
    authValidityPeriodDate=db.Column(db.String())
    authValidityPeriodTime=db.Column(db.String())
    dispenseInstruction=db.Column(db.String())
    dispenseAmountDescription=db.Column(db.String())
    dispenseAmount=db.Column(db.String())
    dispenseAmountUnits=db.Column(db.String())
    dispenseDurationofSupply=db.Column(db.String())
    orderComment=db.Column(db.String())
    orderID=db.Column(db.String())
    userID=db.Column(db.String, db.ForeignKey('patients.email_address'))
    user=db.relationship('patients',backref='prescriptions')  
db.create_all()
db.session.commit()
