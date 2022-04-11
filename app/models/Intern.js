module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: String,
            cpf: String,
            rg: String,
            gender: String,
            birth_date: String,
            email: String,
            phone: String,
            student_registration: String,
            period: String,
            course: String,
            shift: String,
            cep: String,
            state: String,
            city: String,
            district: String,
            street: String,
            home_number: String

        },
        { timestamps: true }
    );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
        });
    const Intern = mongoose.model("interns", schema);
    return Intern;
};