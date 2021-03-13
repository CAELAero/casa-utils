export class OwnerData {
    static create(name, address, date) {
        const retval = new OwnerData();
        retval.name = name;
        retval.address = address;
        retval.commencementDate = date;
        return retval;
    }
}
//# sourceMappingURL=owner-data.js.map