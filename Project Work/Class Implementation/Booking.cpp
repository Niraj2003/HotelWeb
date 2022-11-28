#include <iostream>
using namespace std;

class Booking{
    private:
        string custName;
        int custPhone;
        string custEmail;
        string custPass;
        
    public:
        Booking();
        ~Booking();
        void forgetId();
};

Booking::Booking(){
}

Booking::~Booking(){
}
