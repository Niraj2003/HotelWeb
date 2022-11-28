#include <iostream>
using namespace std;

class User{
    private:
        string custName;
        string custEmail;
        string custPass;
        
    public:
        User(string custName,string custEmail, string custPass);
        ~User();
        void editProfile(string custName,string custEmail, string custPass);
        void showInfo();
};

User::User(string custName,string custEmail, string custPass){
    this->custEmail = custEmail;
    this->custName = custName;
    this->custPass = custPass;
}

User::~User(){
}

void User:: editProfile(string custName,string custEmail, string custPass){
    this->custEmail = custEmail;
    this->custName = custName;
    this->custPass = custPass;
}

void User:: showInfo(){
    cout<< "Customer Name: "<< this->custName<<endl;
    cout<< "Customer Email: " << this->custEmail<<endl;
    cout<< "Customer Password: "<< this->custPass<<endl;
}

int main(){

    // Making object of Class 
    User P1("Niraj", "nrj@gmail.com", "Niraj@123" );
    cout<<endl;
    // Printing Profile Information
    P1.showInfo();
    //Editing Profile Information
    cout<<endl;
    P1.editProfile("NRJ", "nrj@gmail.com", "Niraj@123");
    // Information Changed (Name changed)
    P1.showInfo();
    return 0;
}

