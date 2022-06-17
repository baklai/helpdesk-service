const Inspector = require('../models/inspector.model');

const software = ['USB Disk Security'];

const findAll = async () => {
  return await Inspector.aggregate([
    {
      $addFields: {
        id: '$_id',
        hdd: {
          $reduce: {
            input: '$diskdrive',
            initialValue: 0,
            in: {
              $sum: [
                {
                  $convert: {
                    input: '$$this.Size',
                    to: 'long',
                    onError: 0,
                    onNull: 0
                  }
                },
                '$$value'
              ]
            }
          }
        },
        ram: {
          $reduce: {
            input: '$memorychip',
            initialValue: 0,
            in: {
              $sum: [
                {
                  $convert: {
                    input: '$$this.Capacity',
                    to: 'long',
                    onError: 0,
                    onNull: 0
                  }
                },
                '$$value'
              ]
            }
          }
        },
        cpu: '$cpu.Name',
        system: {
          csname: '$os.CSName',
          osname: '$os.Caption',
          platform: '$os.OSArchitecture',
          version: '$os.Version'
        },
        updated: '$updatedAt',
        total: {
          useraccount: {
            $size: '$useraccount'
          },
          product: {
            $size: '$product'
          },
          share: {
            $size: '$share'
          }
        },
        share: {
          $filter: {
            input: '$share',
            as: 'item',
            cond: {
              $and: [
                {
                  $ne: ['$$item.Name', 'print$']
                },
                {
                  $ne: ['$$item.Name', 'prnproc$']
                }
              ]
            }
          }
        },
        useraccount: {
          $filter: {
            input: '$useraccount',
            as: 'item',
            cond: {
              $and: [
                {
                  $ne: ['$$item.Disabled', 1]
                },
                {
                  $ne: ['$$item.Name', 'toarm']
                },
                {
                  $ne: ['$$item.Name', 'avpz']
                },
                {
                  $ne: ['$$item.Name', 'admasuf']
                },
                {
                  $ne: ['$$item.Name', 'asuf']
                }
              ]
            }
          }
        }
      }
    },
    {
      $project: {
        id: 1,
        _id: 0,
        cpu: 1,
        ram: 1,
        hdd: 1,
        host: 1,
        system: 1,
        updated: 1,
        total: 1,
        warnings: {
          share: {
            $cond: {
              if: {
                $gt: [
                  {
                    $size: {
                      $setIntersection: ['$share.Type', [0]]
                    }
                  },
                  0
                ]
              },
              then: true,
              else: false
            }
          },
          useraccount: {
            $cond: {
              if: {
                $gt: [
                  {
                    $size: {
                      $setIntersection: ['$useraccount.Name', '$useradmin']
                    }
                  },
                  0
                ]
              },
              then: true,
              else: false
            }
          },
          product: {
            $cond: {
              if: {
                $gt: [
                  {
                    $size: {
                      $setIntersection: ['$product.Name', software]
                    }
                  },
                  0
                ]
              },
              then: true,
              else: false
            }
          }
        }
      }
    },
    {
      $sort: {
        updated: -1
      }
    }
  ]).allowDiskUse(true);
};

const findOne = async (id) => {
  return Inspector.findById(id);
};

const createOne = async (data) => {
  return Inspector.findOneAndUpdate({ host: data.host }, data, {
    new: true,
    upsert: true,
    rawResult: true
  });
};

const updateOne = async (id, data) => {
  return Inspector.findByIdAndUpdate(id, { $set: { ...data } });
};

const removeOne = async (id) => {
  return Inspector.deleteOne({ _id: id });
};

module.exports = {
  findAll,
  findOne,
  createOne,
  updateOne,
  removeOne
};
