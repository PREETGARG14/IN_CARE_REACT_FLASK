from market import db,login_manager

from flask_login import UserMixin

@login_manager.user_loader
def load_user(user_id):
    return Patients.query.get(int(user_id)) 

class Patients(db.Model, UserMixin):
    __tablename__ = 'patients'
    id = db.Column(db.Integer(), primary_key=True)
    fullname = db.Column(db.String(length=30), nullable=False, unique=True)
    email_address = db.Column(db.String(length=50), nullable=False, unique=True)
    password_hash = db.Column(db.String(length=600), nullable=False)
    uniq_id = db.Column(db.String(length=30), nullable=False, unique=True)
    # age = db.Column(db.Integer(), nullable=False, default=0)
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
    id = db.Column(db.Integer(), primary_key=True)
    fullname = db.Column(db.String(length=30), nullable=False, unique=True)
    email_address = db.Column(db.String(length=50), nullable=False, unique=True)
    password_hash = db.Column(db.String(length=60), nullable=False)


# class Item(db.Model):
#     id = db.Column(db.Integer(), primary_key=True)
#     name = db.Column(db.String(length=30), nullable=False, unique=True)
#     price = db.Column(db.Integer(), nullable=False)
#     barcode = db.Column(db.String(length=12), nullable=False, unique=True)
#     description = db.Column(db.String(length=1024), nullable=False, unique=True)
#     owner= db.Column(db.Integer(),db.ForeignKey('users.id'))
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

class medSummary(db.Model):
    __tablename__ = 'medSummary'
    #id for the entry
    id=db.Column(db.Integer(),primary_key=True)
    #id for the prescription. Can be used to list all meds prescribed in one session to a patient.
    prescriptionID=db.Column(db.String(), nullable=False)
    #userID, used to identify patient.
    userID=db.Column(db.String(), nullable=False)
    #docID, used to identify doctor.
    docID=db.Column(db.String(), nullable=False)
    #OrderID is to identify the batch of order.
    OrderID=db.Column(db.String(), nullable=False)
    medItem=db.Column(db.String(), nullable=False)
    medName=db.Column(db.String(), nullable=True)
    medForm=db.Column(db.String(), nullable=False)
    medCategory=db.Column(db.String(), nullable=False)
    medStrengthNumerator=db.Column(db.Integer(), nullable=False)
    medStrengthNumeratorUnit=db.Column(db.String(length=2), nullable=False)
    medStrengthDenominator=db.Column(db.Float(), nullable=False)
    medStrengthDenominatorUnit=db.Column(db.String(length=2), nullable=False)
    medUnitofPres=db.Column(db.String(), nullable=False)
    medConcentration=db.Column(db.String(), nullable=False)
    medManufacturer=db.Column(db.String(), nullable=False)
    medBatchId=db.Column(db.String(), nullable=False)
    medExpiry=db.Column(db.DateTime(), nullable=False)
    medAmount=db.Column(db.Float(), nullable=False)
    medAmountUnit=db.Column(db.String(length=2), nullable=False)
    medAlternateAmount=db.Column(db.Float(), nullable=True)
    medAlternateAmountUnit=db.Column(db.String(length=2), nullable=True)
    medRole=db.Column(db.String(), nullable=False)
    medDescription=db.Column(db.String(), nullable=False)
    medDoseAmount=db.Column(db.Float(), nullable=False)
    medDoseAmountLower=db.Column(db.Float(), nullable=True)
    medDoseAmountUpper=db.Column(db.Float(), nullable=True)
    medDoseUnit=db.Column(db.String(length=2), nullable=True)
    medDoseFormula=db.Column(db.String(), nullable=False)
    medDoseDescription=db.Column(db.String(), nullable=False)
    medFrequency=db.Column(db.Float(), nullable=False)
    medFrequencyUnit=db.Column(db.String(), nullable=False)
    medFrequencyLower=db.Column(db.Float(), nullable=True)
    medFrequencyUnitLower=db.Column(db.String(), nullable=True)
    medFrequencyUpper=db.Column(db.Float(), nullable=True)
    medFrequencyUnitUpper=db.Column(db.String(), nullable=True)
    medFrequencyInterval=db.Column(db.DateTime(), nullable=False)
    medDailyTime=db.Column(db.Time(), nullable=False)
    medDailyimeLower=db.Column(db.Time(), nullable=True)
    medDailyTimeUpper=db.Column(db.Time(), nullable=True)
    medDailyTimeDescription=db.Column(db.String(), nullable=False)
    medEventName=db.Column(db.String(), nullable=True)
    medEventOffset=db.Column(db.String(), nullable=True)
    medOn=db.Column(db.String(), nullable=True)
    medOff=db.Column(db.String(), nullable=True)
    medRepetitions=db.Column(db.Integer(), nullable=True)
    medAdminRoute=db.Column(db.String(), nullable=True)
    medTimeRepInterval= db.Column(db.String(), nullable=True)
    medNonDailyFrequency=db.Column(db.Integer(), nullable=True)
    medNonDailyUnit=db.Column(db.String(), nullable=True)
    medNonDailyLowerFrequency=db.Column(db.Integer(), nullable=True)
    medNonDailyLowerUnit=db.Column(db.String(), nullable=True)
    medNonDailyUpperFrequency=db.Column(db.Integer(), nullable=True)
    medNonDailyUpperUnit=db.Column(db.String(), nullable=True)
    # medNonDailyDate=db.column(db.DateTime(), nullable=True)
    # medNonDailyDoW=db.column(db.String(length=9), nullable=True)
    # medNonDailyDoM=db.column(db.Integer(), nullable=True)
    # medNonDailyDoMLower=db.column(db.Integer(), nullable=True)
    # medNonDailyDoMUpper=db.column(db.Integer(), nullable=True)
    # medNonDailyTimingDescription=db.column(db.String(), nullable=True)
    # medNonDailyEventName=db.column(db.String(), nullable=True)
    # medNonDailyTimeOffset=db.column(db.DateTime(), nullable=True)
    # medNonDailyOn=db.column(db.Date(), nullable=True)
    # medNonDailyOff=db.column(db.Date(), nullable=True)
    # medNonDailyRepetitions=db.column(db.Integer(), nullable=True)
    # # Moving to exclusions from Summary
    # globalExclusion=db.Column(db.String(),nullable=True)
    # absenceStatement=db.Column(db.String(), nullable=True)
    # protocolUpdated=db.Column(db.String(), nullable=True)
    
class Prescription(db.Model):
    __tablename__='prescriptions'
    prescriptionID=db.Column(db.String(), nullable=False, primary_key=True)
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
    doseSpecificTime=db.Column(db.Time())
    doseNamedTimeEvent=db.Column(db.String())
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
    directionSpecificDate=db.Column(db.Date())
    directionSpecificTime=db.Column(db.Time())
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
    courseDiscontinuedDate=db.Column(db.Date())
    courseDiscontinuedTime=db.Column(db.Time())
    courseWrittenDate=db.Column(db.Date())
    courseWrittenTime=db.Column(db.Time())
    authNumberofRepeatsAllowed=db.Column(db.Integer())
    authValidityPeriodDate=db.Column(db.Date())
    authValidityPeriodTime=db.Column(db.Time())
    dispenseInstruction=db.Column(db.String())
    dispenseAmountDescription=db.Column(db.String())
    dispenseAmount=db.Column(db.Float())
    dispenseAmountUnits=db.Column(db.String())
    dispenseDurationofSupply=db.Column(db.String())
    orderComment=db.Column(db.String())
    user_id=db.Column(db.Integer(),db.ForeignKey('Patients.uniq_id'))
    user=db.relationship('Patients  ',backref='prescriptions')  
    
    
    
    

db.create_all()
db.session.commit()