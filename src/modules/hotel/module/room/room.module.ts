import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomController } from '../../controller/room/room.controller';
import { Room } from '../../entity/room.entity';
import { RoomService } from '../../service/room/room.service';

@Module({
    imports: [TypeOrmModule.forFeature([Room])],
    controllers: [RoomController],
    providers: [RoomService],
})
export class RoomModule {}
