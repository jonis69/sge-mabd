module.exports = mongoose => {
    const Address = mongoose.model(
        "addresses",
        mongoose.Schema(
            {
                cep: String,
                state: String,
                city: String,
                district: String,
                street: String,
                home_number: String
            },
            { timestamps: true }
        )
    );
    return Address;
};