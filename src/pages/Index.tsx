import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import Icon from '@/components/ui/icon'

export default function Index() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedAssetType, setSelectedAssetType] = useState('all')
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'assistant', content: 'Привет! Я помогу создать новые виджеты для вашего дашборда. Опишите, какую аналитику вы хотели бы видеть.' }
  ])
  const [chatInput, setChatInput] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [subscribers, setSubscribers] = useState(1247)
  const [views, setViews] = useState(3892)
  const [promptTemplates, setPromptTemplates] = useState([
    { id: 1, name: 'Анализ доходности', prompt: 'Создай виджет для анализа доходности портфеля за выбранный период' },
    { id: 2, name: 'Риск-анализ', prompt: 'Добавь виджет оценки рисков с индикаторами VaR и стресс-тестами' }
  ])
  const [newTemplateName, setNewTemplateName] = useState('')
  const [newTemplatePrompt, setNewTemplatePrompt] = useState('')

  // Данные для дашборда
  const portfolioMetrics = {
    totalValue: 2450000,
    monthlyReturn: 8.5,
    yearlyReturn: 12.3,
    riskLevel: 'Умеренный'
  }

  const assetDistribution = [
    { name: 'Акции', value: 45, amount: 1102500, color: 'bg-corporate-blue' },
    { name: 'Облигации', value: 30, amount: 735000, color: 'bg-navy' },
    { name: 'Депозиты', value: 20, amount: 490000, color: 'bg-success-green' },
    { name: 'Валюта', value: 5, amount: 122500, color: 'bg-gray-400' }
  ]

  const recentTransactions = [
    { id: 1, type: 'Покупка', asset: 'Сбербанк ао', amount: 150000, date: '15.08.2025', status: 'Исполнено' },
    { id: 2, type: 'Продажа', asset: 'ОФЗ 26233', amount: 75000, date: '14.08.2025', status: 'Исполнено' },
    { id: 3, type: 'Дивиденды', asset: 'Газпром ао', amount: 12500, date: '13.08.2025', status: 'Получено' }
  ]

  const riskMetrics = [
    { name: 'VaR (1 день, 95%)', value: '45 000 ₽', status: 'low' },
    { name: 'Макс. просадка', value: '8.2%', status: 'medium' },
    { name: 'Beta коэффициент', value: '1.15', status: 'medium' },
    { name: 'Волатильность', value: '18.5%', status: 'high' }
  ]

  const handleSendMessage = () => {
    if (!chatInput.trim()) return
    
    const newMessage = {
      id: chatMessages.length + 1,
      type: 'user',
      content: chatInput
    }
    
    const aiResponse = {
      id: chatMessages.length + 2,
      type: 'assistant',
      content: `Отлично! Я создаю виджет для "${chatInput}". Новый виджет будет добавлен в раздел аналитики с интерактивными графиками и фильтрами.`
    }
    
    setChatMessages([...chatMessages, newMessage, aiResponse])
    setChatInput('')
  }

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed)
    setSubscribers(prev => isSubscribed ? prev - 1 : prev + 1)
  }

  const handleSaveTemplate = () => {
    if (!newTemplateName.trim() || !newTemplatePrompt.trim()) return
    
    const newTemplate = {
      id: promptTemplates.length + 1,
      name: newTemplateName,
      prompt: newTemplatePrompt
    }
    
    setPromptTemplates([...promptTemplates, newTemplate])
    setNewTemplateName('')
    setNewTemplatePrompt('')
  }

  const handleUseTemplate = (template) => {
    setChatInput(template.prompt)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-gray to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-navy to-corporate-blue rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" className="text-white" size={18} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-navy">Аналитический дашборд</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={14} />
                    <span>{views.toLocaleString()} просмотров</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={14} />
                    <span>{subscribers.toLocaleString()} подписчиков</span>
                  </div>
                  <Badge variant="outline" className="text-navy border-navy">
                    <Icon name="Star" size={12} className="mr-1" />
                    Рейтинг: 4.8
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                onClick={handleSubscribe}
                variant={isSubscribed ? "outline" : "default"}
                className={isSubscribed ? "border-navy text-navy" : "bg-navy hover:bg-navy/90"}
              >
                <Icon name={isSubscribed ? "UserCheck" : "UserPlus"} size={16} className="mr-2" />
                {isSubscribed ? 'Отписаться' : 'Подписаться'}
              </Button>
              
              {/* Чат с ИИ */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="border-corporate-blue text-corporate-blue">
                    <Icon name="MessageSquare" size={16} className="mr-2" />
                    ИИ Помощник
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-96">
                  <SheetHeader>
                    <SheetTitle className="flex items-center space-x-2">
                      <Icon name="Bot" size={20} />
                      <span>ИИ Аналитик</span>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col h-full mt-6">
                    <ScrollArea className="flex-1 pr-4">
                      <div className="space-y-4">
                        {chatMessages.map((message) => (
                          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-lg ${
                              message.type === 'user' 
                                ? 'bg-corporate-blue text-white' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              <p className="text-sm">{message.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    
                    <Separator className="my-4" />
                    
                    {/* Шаблоны промптов */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Шаблоны запросов:</h4>
                      <div className="space-y-2">
                        {promptTemplates.map((template) => (
                          <button
                            key={template.id}
                            onClick={() => handleUseTemplate(template)}
                            className="w-full text-left p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded border"
                          >
                            <div className="font-medium">{template.name}</div>
                            <div className="text-gray-600 truncate">{template.prompt}</div>
                          </button>
                        ))}
                      </div>
                      
                      {/* Добавить новый шаблон */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="w-full mt-2">
                            <Icon name="Plus" size={14} className="mr-1" />
                            Добавить шаблон
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Новый шаблон промпта</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium">Название шаблона</label>
                              <Input
                                placeholder="Например: Анализ волатильности"
                                value={newTemplateName}
                                onChange={(e) => setNewTemplateName(e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Текст промпта</label>
                              <Textarea
                                placeholder="Опишите, какой виджет или анализ нужно создать..."
                                value={newTemplatePrompt}
                                onChange={(e) => setNewTemplatePrompt(e.target.value)}
                                rows={3}
                              />
                            </div>
                            <Button onClick={handleSaveTemplate} className="w-full">
                              Сохранить шаблон
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Опишите нужный виджет..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button onClick={handleSendMessage} size="sm">
                        <Icon name="Send" size={16} />
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">День</SelectItem>
                  <SelectItem value="week">Неделя</SelectItem>
                  <SelectItem value="month">Месяц</SelectItem>
                  <SelectItem value="year">Год</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedAssetType} onValueChange={setSelectedAssetType}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все активы</SelectItem>
                  <SelectItem value="stocks">Акции</SelectItem>
                  <SelectItem value="bonds">Облигации</SelectItem>
                  <SelectItem value="deposits">Депозиты</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Ключевые метрики */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-corporate-blue to-navy text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Общая стоимость портфеля</p>
                  <p className="text-2xl font-bold">₽{portfolioMetrics.totalValue.toLocaleString()}</p>
                </div>
                <Icon name="Wallet" className="text-blue-200" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Доходность за месяц</p>
                  <p className="text-2xl font-bold text-success-green">+{portfolioMetrics.monthlyReturn}%</p>
                </div>
                <Icon name="TrendingUp" className="text-success-green" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Годовая доходность</p>
                  <p className="text-2xl font-bold text-success-green">+{portfolioMetrics.yearlyReturn}%</p>
                </div>
                <Icon name="BarChart3" className="text-success-green" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Уровень риска</p>
                  <Badge variant="outline" className="mt-1 text-navy border-navy">
                    {portfolioMetrics.riskLevel}
                  </Badge>
                </div>
                <Icon name="Shield" className="text-navy" size={32} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Основной контент */}
        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList className="bg-white border shadow-sm">
            <TabsTrigger value="portfolio">Портфель</TabsTrigger>
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
            <TabsTrigger value="forecast">Прогнозы</TabsTrigger>
            <TabsTrigger value="risks">Риски</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Распределение активов */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="PieChart" size={20} />
                    <span>Распределение активов</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {assetDistribution.map((asset) => (
                    <div key={asset.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${asset.color}`} />
                          <span className="font-medium">{asset.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">₽{asset.amount.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">{asset.value}%</div>
                        </div>
                      </div>
                      <Progress value={asset.value} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* График доходности */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="LineChart" size={20} />
                    <span>Динамика доходности</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-r from-corporate-blue/10 to-navy/10 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Icon name="TrendingUp" size={48} className="mx-auto mb-2" />
                      <p>График доходности за {selectedPeriod}</p>
                      <p className="text-sm">Интерактивный график будет здесь</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Недавние транзакции */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="History" size={20} />
                  <span>Недавние операции</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          transaction.type === 'Покупка' ? 'bg-success-green/10' :
                          transaction.type === 'Продажа' ? 'bg-alert-red/10' : 'bg-corporate-blue/10'
                        }`}>
                          <Icon 
                            name={transaction.type === 'Покупка' ? 'Plus' : transaction.type === 'Продажа' ? 'Minus' : 'DollarSign'} 
                            className={`${
                              transaction.type === 'Покупка' ? 'text-success-green' :
                              transaction.type === 'Продажа' ? 'text-alert-red' : 'text-corporate-blue'
                            }`} 
                            size={18} 
                          />
                        </div>
                        <div>
                          <div className="font-medium">{transaction.type}</div>
                          <div className="text-sm text-gray-600">{transaction.asset}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">₽{transaction.amount.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">{transaction.date}</div>
                      </div>
                      <Badge variant="outline" className="ml-4">
                        {transaction.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Сравнительный анализ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-r from-navy/5 to-corporate-blue/5 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Icon name="BarChart3" size={48} className="mx-auto mb-2" />
                      <p>Сравнение с бенчмарками</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Корреляционная матрица</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-corporate-blue/5 to-success-green/5 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Icon name="Grid3X3" size={48} className="mx-auto mb-2" />
                      <p>Корреляция активов</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="forecast" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Прогнозирование доходности</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gradient-to-r from-navy/5 to-success-green/5 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Icon name="Crystal" size={48} className="mx-auto mb-2" />
                    <p>Модели прогнозирования</p>
                    <p className="text-sm mt-2">ML модели для предсказания будущей доходности</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risks" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {riskMetrics.map((metric) => (
                <Card key={metric.name}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-700">{metric.name}</h3>
                        <p className="text-2xl font-bold mt-1">{metric.value}</p>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${
                        metric.status === 'low' ? 'bg-success-green' :
                        metric.status === 'medium' ? 'bg-yellow-500' : 'bg-alert-red'
                      }`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Стресс-тестирование</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-r from-alert-red/5 to-yellow-500/5 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Icon name="AlertTriangle" size={48} className="mx-auto mb-2" />
                    <p>Анализ стресс-сценариев</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}