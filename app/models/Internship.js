module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            // fazer foreign key dps
            name: String,
            advisor: String,
            supervisor: String,
            salary_amount: Number,
            start_date: Date,
            end_date: Date,
            report_date: Date,
            // fazer foreign key dps
            agreement: String

        },
        { timestamps: true }
    );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
        });
    const Internship = mongoose.model("internships", schema);
    return Internship;
};