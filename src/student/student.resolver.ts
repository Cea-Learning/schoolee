/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateStudentInput } from "./create-student.input";
import { StudentService } from "./student.service";
import { StudentType } from "./student.type";

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(
    private studentService: StudentService
  ){}
  @Query(() => [StudentType])
  async getStudents(){
    return this.studentService.getStudents();
  }
  @Query(() => StudentType)
  async getStudent(@Args('id') id: string){
    return this.studentService.getStudent(id);
  }

  @Mutation(() => StudentType)
  async createStudent(@Args("createStudentInput") createStudentInput: CreateStudentInput) {
    return this.studentService.createStudent(createStudentInput)
   }

}