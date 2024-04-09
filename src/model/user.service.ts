import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async createUser(
    mobileNumber: string,
    botID: string,
  ): Promise<User> {
    const existingUser = await this.findUserByMobileNumber(mobileNumber);
    console.log("existingUser",existingUser)
    console.log(botID)
    if (existingUser) {
      existingUser.mobileNumber=mobileNumber;
      return this.userRepository.save(existingUser);
    } else {
      const newUser = new User();
      newUser.mobileNumber = mobileNumber;
      newUser.id = uuidv4();
      newUser.botID = botID; 
      newUser.userContext = ''; 
      newUser.buttonResponse = ''; 
      newUser.language = 'English'; 
      return this.userRepository.save(newUser);
    }
  }

  async findUserByMobileNumber(
    mobileNumber: string,
  ): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { mobileNumber } });
  }

  async saveUser(user: User): Promise<User | undefined> {
    return this.userRepository.save(user);
  }
  async saveButtonResponse(mobileNumber: string, botID: string,buttonResponse:string): Promise<User> {
    const existingUser = await this.findUserByMobileNumber(mobileNumber);
    if (existingUser) {
      existingUser.buttonResponse = buttonResponse;
      return this.userRepository.save(existingUser);
    } else {
      const newUser = new User();
      newUser.mobileNumber = mobileNumber;
      newUser.id = uuidv4(); 
      newUser.botID = botID; 
      newUser.userContext = ''; 
      newUser.buttonResponse = buttonResponse;
      newUser.language = 'English'; 
      return this.userRepository.save(newUser);
    }
  };
  async saveLanguage(mobileNumber: string, botID: string,language:string): Promise<User> {
    const existingUser = await this.findUserByMobileNumber(mobileNumber);
    if (existingUser) {
      existingUser.language = language;
      return this.userRepository.save(existingUser);
    } else {
      const newUser = new User();
      newUser.mobileNumber = mobileNumber;
      newUser.id = uuidv4(); 
      newUser.botID = botID; 
      newUser.userContext = ''; 
      newUser.buttonResponse = '';
      newUser.language = language; 
      return this.userRepository.save(newUser);
    }
  };
}
