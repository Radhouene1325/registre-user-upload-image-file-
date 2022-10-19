import Joi from "@hapi/joi"

export const validationRegster=(data)=>{

    const schema=Joi.object({
      name:Joi.string().max(20).min(3).required(),
      email:Joi.string().required().max(255).min(1).email(),
      password:Joi.string().max(5).required(),
      imageUser:Joi.object()
    
    })
    return schema.validate(data)
}
