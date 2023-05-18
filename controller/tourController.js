const fs = require("fs");

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../tour-simple.json`));

const checkId = (req, res, next, val) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: "Fail",
      message: "Invalid Id",
    });
  }
  next();
};

const checkbody=(req,res,next)=>{
  if(!req.body.name||!req.body.price){
    return res.status(404).json({
      status:"Fail",
      message:"Misssing name or price"
    })
  }
  next();
}

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "Success",
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: "Success",
    data: {
      tour,
    },
  });
};

const updateTour = (req, res) => {
  const id = req.params.id * 1;

  const index = tours.findIndex((value) => {
    return value.id == id;
  });

  for(b in req.body){
    tours[index][b] = req.body[b];
  }

  fs.writeFile(
    `${__dirname}/../tour-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "Success",
        data: {
          tours: tours,
        },
      });
    }
  );
};



const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../tour-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "Success",
        data: {
          tours: newTour,
        },
      });
    }
  );
};

const deletTour = (req, res) => {
  const id = req.params.id * 1;
  const aftrDltTour = tours.filter((value) => {
    return value.id != id;
  });
  const deletedTour = tours.filter((value) => {
    return value.id == id;
  });

  fs.writeFile(
    `${__dirname}/../tour-simple.json`,
    JSON.stringify(aftrDltTour),
    (err) => {
      res.status(201).json({
        status: "Success",
        data: {
          dtour:deletedTour
        },
      });
    }
  );
};

module.exports = {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deletTour,
  checkId,
  checkbody
};
