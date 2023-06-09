class APIFeature {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
    
    filter() {
      const queryObj = { ...this.queryString };
      const excludedField = ["sort", "page", "limit", "fields"];
      
      excludedField.forEach((el) => {
        delete queryObj[el];
      });
      
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
      this.query.find(JSON.parse(queryStr));
      return this;
    }

    // Sorting
    sort() {
      if (this.queryString.sort) {
        let sortBy = this.queryString.sort.split(',').join(' ');
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort('-createdAt');
      }
      return this;
    }
  
    // Limit Feilds or Projection
    limitFields() {
      if (this.queryString.fields) {
        let fields = this.queryString.fields.split(",").join(" ");
        this.query = this.query.select(fields);
      } else {
        this.query = this.query.select("-__v");
      }
      return this;
    }
  
    // Pagination
    paginate() {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 100;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
      return this;
    }
  }

  module.exports=APIFeature;