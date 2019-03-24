module.exports = mongoose => {
    const Schema = mongoose.Schema;
    const ObjectId = mongoose.Types.ObjectId;
  
    mongoose.connection.on("open", () => {
      console.log("Connection is successful");
    });
  
    mongoose.connection.on("error", ex => {
      console.log("Error in db :: ", String(ex));
    });
  
    function randomCodeGenerator() {
      return Math.floor(1000 + Math.random() * 9000);
    }
  
    const AuraSchema = new Schema(
      {
        name: {
          type: String,
          required: true
        }
      },
      {
        timestamps: true
      }
    );
  const ChatSchema = new Schema (
    {
     to: {
        type: Schema.Types.ObjectId,
          ref: "User"
      },
      from: {
       type: Schema.Types.ObjectId,
          ref: "User"
      },
      message: {
        type: String,
        default: null
      },
      seen: {
        type: Boolean,
            default: false
      },
      timestamp: {
        type: Date,
          default: null
      }
    }
  );
    const UserSchema = new Schema(
      {
        first_name: {
          type: String,
          default: null
        },
        last_name: {
          type: String,
          default: null
        },
        gender: {
          type: Number,
          enum: [0, 1, 2],
          default: 1
        },
        email: {
          type: String,
          default: null
        },
        facebook_id: {
          type: String,
          default: null
        },
        account_kit_id: {
          type: String,
          default: null
        },
        mobileNo: {
          number: {
            type: String,
            default: null
          },
          country_prefix: {
            type: String,
            default: null
          },
          national_number: {
            type: String,
            default: null
          }
        },
        username: {
          type: String,
          default: null
        },
        display_picture: {
          url: {
            type: String,
            default: null
          },
          is_silhouette: {
            type: Boolean,
            default: true
          },
          cloudinary_id: {
            type: String,
            default: null
          },
          width: {
            type: Number,
            default: null
          },
          height: {
            type: Number,
            default: null
          },
          format: {
            type: String,
            default: "jpg"
          }
        },
        role: {
          type: String,
          default: 'app_user'
        },
        birthday: {
          type: Date,
          default: null
        },
        work: {
          type: String,
          default: null
        },
        aura: [{ type: Schema.Types.ObjectId, ref: "Aura" }],
        followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
        following: [{ type: Schema.Types.ObjectId, ref: "User" }],
        average_rating: {
          type: Number,
          default: 0
        },
        loc: {
          type: {
            type: String,
            enum: "Point",
            default: "Point"
          },
          coordinates: {
            type: Array,
            default: [40.7128, 74.006]
          }
        },
        human_location: {
          type: String,
          default: null
        },
        isTermsAndConditions: {
          type: Boolean,
          default: false
        },
        isEmailVerified: {
          type: Boolean,
          default: false
        },
        isProfileCompleted: {
          type: Boolean,
          default: false
        },
        isUsernameSet: {
          type: Boolean,
          default: false
        },
        emailVerificationCode: {
          type: String,
          default: null
        },
        NumberOfAttemptsPerDay: {
          type: Number,
          default: 0
        },
        NumberOfAttemptsPerCode: {
          type: Number,
          default: 0
        },
        recoveryAttemptsPerDay: {
          type: Number,
          default: 0
        },
        recoveryToken: {
          type: String,
          default: null
        },
        lastVerificationAtempts: {
          type: Date,
          default: null
        },
        lastRecoveryAtempts: {
          type: Date,
          default: null
        }
      },
      {
        timestamps: true
      }
    );
  
    const UserRating = new Schema(
      {
        ratingFor: {
          type: Schema.Types.ObjectId,
          ref: "User"
        },
        comments: {
          type: String,
          default: ""
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5
        },
        ratedBy: {
          type: Schema.Types.ObjectId,
          ref: "User"
        }
      },
      {
        timestamps: true
      }
    );
  
    const WishSchema = new Schema(
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User"
        },
        author: {
          type: String,
          default: "Anonymous"
        },
        author_dp: {
          type: Schema.Types.Mixed,
          default: {
            url: 'https://res.cloudinary.com/gnie/image/upload/s--Yhjq2NRf--/c_scale,w_240/v1537677831/statics/gender-neutral-user.png'
          }
        },
        isActive: {
          type: Boolean,
          default: false
        },
        isExpired: {
          type: Boolean,
          default: false
        },
        isDeleted: {
          type: Boolean,
          default: false
        },
        isAnonymous: {
          type: Boolean,
          default: false
        },
        hasMedia: {
          type: Boolean,
          default: false
        },
        expireAt: {
          type: Date
        },
        expiryInDays: {
          type: Number,
          min: 1,
          max: 30
        },
        shineCount: {
          type: Number,
          min: 0,
          default: 0
        },
        shines: [
          {
            type: Schema.Types.ObjectId,
            ref: "User"
          }
        ],
        wishRequestsCount: {
          type: Number,
          min: 0,
          default: 0
        },
        images: [
          {
            type: Schema.Types.Mixed
          }
        ],
        videos: [
          {
            type: Schema.Types.Mixed
          }
        ],
        postIn: {
          type: String,
          required: true,
          default: "MyCircle",
          enum: ["MyCircle", "Strangers", "Anonymous", "Everyone"]
        },
        wish: {
          type: String,
          required: true
        },
        reward: {
          type: String,
          default: null
        },
        loc: {
          type: {
            type: String,
            enum: "Point",
            default: "Point"
          },
          coordinates: {
            type: Array,
            default: [40.7128, 74.006]
          }
        },
        human_location: {
          type: String,
          default: null
        },
      },
      {
        timestamps: true
      }
    );
  
    const WishRequestSchema = new Schema(
      {
        senders_id: {
          type: Schema.Types.ObjectId,
          ref: "User"
        },
        wish_id: {
          type: Schema.Types.ObjectId,
          ref: "Wish"
        },
        wish_user_id: {
          type: Schema.Types.ObjectId,
          ref: "User"
        },
        hasMedia: {
          type: Boolean,
          default: false,
        },
        media: [
          {
            type: Schema.Types.Mixed
          }
        ],
        message: {
          type: String,
          default: null,
        },
        isJump:{
          type: Boolean,
          default: true
        },
        status: {
          type: String,
          enum: ["Accepted", "Rejected", "Pending", 'Canceled', 'WISH_DELETED'],
          default: "Pending"
        },
        wish_expireAt: {
          type: Date
        },
        wish_isAnonymous: {
          type: Boolean,
          default: false
        }
      },
      { timestamps: true }
    );
  
    UserSchema.index({ loc: "2dsphere" });
    WishSchema.index({ loc: "2dsphere" });
  
    UserSchema.virtual("full_name").get(function() {
      return this.first_name + " " + this.last_name;
    });
  
    UserSchema.methods.getCompleteUserProfile = async function() {
      let pipline = [
        {
          $match: {
            user: ObjectId(this._id)
          }
        },
        {
          $group: {
            _id: "$user",
            totalShine: { $sum: "$shineCount" }
          }
        }
      ];
      let shineCountPromise = Wish.aggregate(pipline);
      let ratingQuery = {
        ratingFor: ObjectId(this._id)
      };
      let ratingCountPromise = Rating.count(ratingQuery);
      let auraPromise = Aura.populate(this, {
        path: "aura",
        select: "name _id"
      });
      let [shineCount, ratingCount, aura] = await Promise.all([
        shineCountPromise,
        ratingCountPromise,
        auraPromise
      ]);
      console.log(shineCount);
      return {
        id: this._id,
        first_name: this.first_name,
        last_name: this.last_name,
        gender: this.gender,
        mobileNo: this.mobileNo,
        work: this.work,
        aura: aura.aura,
        display_picture: this.display_picture,
        isEmailVerified: this.isEmailVerified,
        isProfileCompleted: this.isProfileCompleted,
        isUsernameSet: this.isUsernameSet,
        isTermsAndConditions: this.isTermsAndConditions,
        username: this.username,
        email: this.email,
        birthday: this.birthday,
        human_location: this.human_location,
        loc: this.loc,
        average_rating: this.average_rating,
        followersCount: this.followers.length,
        followingCount: this.following.length,
        shineCount: shineCount.length > 1 ? shineCount[0].totalShine : 0,
        ratingCount: ratingCount
      };
    };
  
    UserSchema.methods.getPublicProfile = async function() {
      let pipline = [
        {
          $match: {
            user: ObjectId(this._id)
          }
        },
        {
          $group: {
            _id: "$user",
            totalShine: { $sum: "$shineCount" }
          }
        }
      ];
      let shineCountPromise = Wish.aggregate(pipline);
      let ratingQuery = {
        ratingFor: ObjectId(this._id)
      };
      let ratingCountPromise = Rating.count(ratingQuery);
      let auraPromise = Aura.populate(this, {
        path: "aura",
        select: "name _id"
      });
      let [shineCount, ratingCount, aura] = await Promise.all([
        shineCountPromise,
        ratingCountPromise,
        auraPromise
      ]);
      return {
        id: this._id,
        first_name: this.first_name,
        last_name: this.last_name,
        gender: this.gender,
        work: this.work,
        aura: aura.aura,
        display_picture: this.display_picture,
        username: this.username,
        human_location: this.human_location,
        loc: this.loc,
        average_rating: this.average_rating,
        followersCount: this.followers.length,
        followingCount: this.following.length,
        shineCount: shineCount.length > 1 ? shineCount[0].totalShine : 0,
        ratingCount: ratingCount
      };
    };
  
    UserSchema.methods.generateUsername = function() {
      return [this.first_name, this.last_name[0], randomCodeGenerator()]
        .join(".")
        .replace(/ /g, "")
        .toLowerCase();
    };
  
    WishSchema.methods.postPayload = function() {
      return {
        _id: this._id,
        wish: this.wish,
        expireAt: this.expireAt,
        author: this.author,
        author_dp: this.author_dp,
        expiryInDays: this.expiryInDays,
        isAnonymous: this.isAnonymous,
        reward: this.reward,
        images: this.images,
        videos: this.videos,
        loc: this.loc,
        shineCount: this.shineCount,
        human_location: this.human_location
      };
    };
  
    const User = mongoose.model("User", UserSchema);
    const Aura = mongoose.model("Aura", AuraSchema);
    const Wish = mongoose.model("Wish", WishSchema);
    const Rating = mongoose.model("Rating", UserRating);
    const Chat = mongoose.model("Chat",ChatSchema);
    const WishRequest = mongoose.model("WishRequest", WishRequestSchema);
  
    return {
      Wish,
      User,
      WishRequest,
      Chat
    };
  };
  