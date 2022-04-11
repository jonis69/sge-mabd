module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            company_name: String,
            cnpj: String,
            email: String,
            phone: String,
            business_nature: String,
            start_date: String,
            end_date: String

        },
        { timestamps: true }
    );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
        });
    const Agreement = mongoose.model("agreements", schema);
    return Agreement;
};