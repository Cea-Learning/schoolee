/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { StudentService } from "src/student/student.service";
import { AssignStudentInput } from "./assign-students.input";
import { Lesson } from "./lesson.entity";
import { CreateLessonInput } from "./lesson.input";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService
  ) { }
  @Query(() => LessonType)
  lesson(
    @Args('id') id: string
  ) {
    return this.lessonService.getLesson(id)
  }

  @Query(() => [LessonType])
  lessons(
  ) {
    return this.lessonService.getLessons()
  }

  @Mutation(() => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }
  @Mutation(() => LessonType)
  assignStudentToLesson(
    @Args("assignStudentsToLessonInput") assignStudentToLessonInput: AssignStudentInput
  ) {
    const { lessonId, studentIds } = assignStudentToLessonInput;
    return this.lessonService.assignStudentsToLesson(lessonId, studentIds)
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return this.studentService.getManyStudents(lesson.students)
  }

}