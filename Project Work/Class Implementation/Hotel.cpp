#include <iostream>
using namespace std;

class Hotel{
    private:
        string hotelName;
        string hotelLocation;
        int hotelRent;
        int hotelRating;
        long long hotelPhone;
        string hotelEmail;

    public:
        Hotel(string hotelName,string hotelLocation, int hotelRent,long long hotelPhone,string hotelEmail){
            this->hotelName = hotelName;
            this->hotelLocation = hotelLocation;
            this->hotelRent = hotelRent; 
            this->hotelPhone = hotelPhone;
            this->hotelEmail = hotelEmail ; 
        };
        ~Hotel();
        void editRent(int newRent){
            hotelRent = newRent;
        }
        void editName(string newName){
            hotelName = newName;
        }
        void showHotelDetails(){
            cout<<"Hotel Name : "<< this->hotelName<< endl;
            cout<< "Hotel Location : "<< this->hotelLocation<< endl;
            cout<< "Hotel Rent (Per Night) : "<<this->hotelRent<< endl;
            cout<< "Hotel Phone Number : "<<this->hotelPhone<< endl;
        }
        void logout();
        void editProf();
};

Hotel::~Hotel(){
}

int main(){

    // Declearing Object
    Hotel H1("Hotel Vishwakarma ", "Kondhwa ", 1800, 9960641238, "vishwakarma@gmail.com");
    // Changing Hotel Name
    cout<<endl;
    H1.showHotelDetails();
    cout<<endl;
    cout<<"Changing Hotel Name  ->>"<<endl;
    H1.editName("Vishwakarma Hotel");
    H1.showHotelDetails();
    // Changing Hotel Rent
    cout<<endl;
    cout<<"Changing Hotel Rent ->>"<<endl;
    H1.editRent(2000);
    cout<<endl;
    H1.showHotelDetails();


    return 0;
}