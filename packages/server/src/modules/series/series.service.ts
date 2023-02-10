import { Injectable } from '@nestjs/common';
import { AppErrorException } from '~/common/exceptions';
import { CreateSeriestDto } from './dto/create-series.dto';
import { SeriesRepository } from './series.repository';

@Injectable()
export class SeriesService {
  constructor(private readonly seriesRepository: SeriesRepository) {}

  async getUserSeriesList(username: string) {
    return await this.seriesRepository.findUserSeriesList(username);
  }

  async getSeriesByName(username: string, seriesName: string) {
    const series = await this.seriesRepository.findSeriesByName(
      username,
      seriesName,
    );
    if (!series) throw new AppErrorException('NotFound', 'Series not found');
    return series;
  }

  async getSeriesById(userId: string, seriesId: string) {
    const series = await this.seriesRepository.findSeriesById(userId, seriesId);
    if (!series) throw new AppErrorException('NotFound', 'Series not found');
    return series;
  }

  async createSeries(dto: CreateSeriestDto, userId: string) {
    const exists = await this.seriesRepository.findSeriesByName(
      userId,
      dto.name,
    );
    if (exists)
      throw new AppErrorException(
        'BadRequest',
        'Series with this name already exists',
      );
    return await this.seriesRepository.createSeries(dto, userId);
  }

  async appendPostToSeries(seriesId: string, postId: string, userId: string) {
    const series = await this.getSeriesById(userId, seriesId);
    if (series.userId !== userId)
      throw new AppErrorException(
        'Forbidden',
        "You don't have permission to append post this series",
      );
    return await this.seriesRepository.appendPostToSeries(
      seriesId,
      postId,
      userId,
    );
  }

  async deleteSeries(seriesId: string, userId: string) {
    const series = await this.getSeriesById(userId, seriesId);
    if (series.userId !== userId)
      throw new AppErrorException(
        'Forbidden',
        "You don't have permission to delete this series",
      );
    return await this.seriesRepository.deleteSeries(seriesId);
  }
}