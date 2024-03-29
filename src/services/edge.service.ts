import Service = require('./service');
import Edge = require('../domain/edge.domain');
import EdgeDTO = require('../dto/edge.dto');
import EdgeRepository = require('../repositories/edge.repository');

class EdgeService extends Service {
  private edgeRepository: EdgeRepository; 

  constructor() {
    super();
    this.edgeRepository = this.repository.edgeRepository;
  }

  async findAllBySourceId(id: string): Promise<Edge[]> {
    return this.edgeRepository.find({ source: id });
  }

  async findAllByUserId(id: string): Promise<Edge[]> {
    return this.edgeRepository.find({ user: id });
  }

  async findAllByFlowId(id: string): Promise<Edge[]> {
    return this.edgeRepository.find({ flow: id });
  }

  async removeAllWithFlowId(id: string): Promise<Edge[]> {
    return this.edgeRepository.deleteMany({ flow: id });
  }

  async insert(edge: EdgeDTO): Promise<Edge> {
    return this.edgeRepository.save(edge);
  }
}

export = EdgeService;
