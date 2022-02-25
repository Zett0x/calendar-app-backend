// {
//     ok:true,
//     msg:'get events'
// }

const getEvents = (req, res) => {
  return res.json({
    ok: true,
    msg: "getEvents",
  });
};

const createEvent = (req, res) => {
  return res.json({
    ok: true,
    msg: "createEvent",
  });
};

const updateEvent = (req, res) => {
  return res.json({
    ok: true,
    msg: "updateEvent",
  });
};

const deleteEvent = (req, res) => {
  return res.json({
    ok: true,
    msg: "deleteEvent",
  });
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
