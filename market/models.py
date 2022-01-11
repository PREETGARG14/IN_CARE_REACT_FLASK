from market import db,login_manager

from flask_login import UserMixin

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id)) 

class User(db.Model,UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(length=30), nullable=False, unique=True)
    email_address = db.Column(db.String(length=50), nullable=False, unique=True)
    password_hash = db.Column(db.String(length=600), nullable=False)
    budget = db.Column(db.Integer(), nullable=False, default=0)
    items = db.relationship('Item', backref='owned_user', lazy=True)    

    @property
    def prettier_budget(self):
        if len(str(self.budget)) >= 4:
            return f'Rs {str(self.budget)[:-3]},{str(self.budget)[-3:]}'
        else:
            return f"Rs {self.budget}"

    @property
    def password(self):
        return self.password

    @password.setter
    def password(self, plain_text_password):
        self.password_hash = plain_text_password

    def check_password_correction(self, attempted_password):
        return (self.password_hash, attempted_password)  

    def can_purchase(self, item_obj):
        return self.budget >= 0  

    def can_sell(self, item_obj):
        return item_obj in self.items

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
    medNonDailyDate=db.column(db.Date(), nullable=True)
    medNonDailyDoW=db.column(db.String(length=9), nullable=True)
    medNonDailyDoM=db.column(db.Integer(), nullable=True)
    medNonDailyDoMLower=db.column(db.Integer(), nullable=True)
    medNonDailyDoMUpper=db.column(db.Integer(), nullable=True)
    medNonDailyTimingDescription=db.column(db.String(), nullable=True)
    medNonDailyEventName=db.column(db.String(), nullable=True)
    medNonDailyTimeOffset=db.column(db.DateTime(), nullable=True)
    medNonDailyOn=db.column(db.Date(), nullable=True)
    medNonDailyOff=db.column(db.Date(), nullable=True)
    medNonDailyRepetitions=db.column(db.Integer(), nullable=True)
    # Moving to exclusions from Summary
    globalExclusion=db.Column(db.String(),nullable=True)
    absenceStatement=db.Column(db.String(), nullable=True)
    protocolUpdated=db.Column(db.String(), nullable=True)
    
    
    

# class AdminUser(db.Model, UserMixin):
#     __tablename__ = 'admin'
#     id = db.Column(db.Integer(), primary_key=True)
#     username = db.Column(db.String(length=30), nullable=False, unique=True)
#     email_address = db.Column(db.String(length=50), nullable=False, unique=True)
#     password_hash = db.Column(db.String(length=60), nullable=False)

db.create_all()
db.session.commit()